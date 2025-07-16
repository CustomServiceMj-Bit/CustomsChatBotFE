import { postQuestionToBot } from "@/api/postQuestionToBot";
import { SERVER_CONNET_ERROR, TOAST_MESSAGES } from "@/constants/texts";
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
      toast(TOAST_MESSAGES.INVALID_TEXT);
      return;
    }

    if (isSendingRef.current) {
      toast(TOAST_MESSAGES.PROCESSING_TEXT);
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
      const progressDetails = response.data.progress_details;
      const errorReason = response.data.error_reason;

      removeTyping();

      if (progressDetails) {
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
          message: SERVER_CONNET_ERROR,
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
