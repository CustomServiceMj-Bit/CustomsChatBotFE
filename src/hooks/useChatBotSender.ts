import { postQuestionToBot } from "@/api/postQuestionToBot";
import { useChatMessageStore } from "@/store/useStore";
import { ProgressDetailsType } from "@/types/api/types";

export const useChatBotSender = () => {
  const addMessages = useChatMessageStore((s) => s.addMessages);
  const removeTyping = useChatMessageStore((s) => s.removeTyping);

  const sendMessage = async (text: string) => {
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
          { role: "bot", message: progressDetails, id: "progress" },
        ]);
      } else if (!reply && errorReason) {
        //통관 진행 요청 실패
        addMessages([{ role: "bot", message: errorReason, id: "markdown" }]);
      } else if (reply && !progressDetails) {
        //gpt 답변만 오는 경우
        addMessages([{ role: "bot", message: reply, id: "markdown" }]);
      }
    } catch (error) {
      console.error(error);
      addMessages([
        {
          role: "bot",
          message: "죄송합니다. 서버와의 연결에 실패했습니다.",
        },
      ]);
    }
  };

  return { sendMessage };
};
