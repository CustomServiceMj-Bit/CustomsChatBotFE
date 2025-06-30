import { postQuestionToBot } from "@/api/postQuestionToBot";
import { isMaliciousInput, randomAnswer } from "@/lib/utils/utils";
import { useChatMessageStore } from "@/store/useStore";
import { useRef } from "react";
import { toast } from "sonner";

export const useChatBotSender = () => {
  const addMessages = useChatMessageStore((s) => s.addMessages);
  const removeTyping = useChatMessageStore((s) => s.removeTyping);

  const isSendingRef = useRef(false);

  const sendMessage = async (text: string) => {
    if (isMaliciousInput(text)) {
      toast("입력값에 허용되지 않은 코드가 포함되어 있어요.");
      return;
    }

    if (isSendingRef.current) {
      toast("질문을 처리 중입니다. 잠시만 기다려주세요.");
      return;
    }
    isSendingRef.current = true;

    addMessages([{ role: "user", message: text }]);

    await new Promise((res) => setTimeout(res, 1000));

    addMessages([
      {
        role: "bot",
        message: "입력 중...",
        id: "typing",
      },
    ]);

    try {
      const response = await postQuestionToBot(text);
      const reply = response.data.reply;
      const progressDetails = response.data.progressDetails;
      const errorReason = response.data.errorReason;

      removeTyping();

      if (!reply && progressDetails) {
        //통관 진행 요청 성공
        addMessages([
          {
            role: "bot",
            message: progressDetails,
            id: "progress",
          },
          {
            role: "bot",
            message: randomAnswer(),
            id: "markdown",
          },
        ]);
      } else if (!reply && errorReason) {
        //통관 진행 요청 실패
        addMessages([{ role: "bot", message: errorReason, id: "markdown" }]);
      } else if (reply && !progressDetails) {
        //gpt 답변만 오는 경우
        addMessages([{ role: "bot", message: reply, id: "markdown" }]);
      }
    } catch (error) {
      addMessages([
        {
          role: "bot",
          message: "죄송합니다. 서버와의 연결에 실패했습니다.",
        },
      ]);
    } finally {
      setTimeout(() => {
        isSendingRef.current = false;
      }, 1000);
    }
  };

  return { sendMessage };
};
