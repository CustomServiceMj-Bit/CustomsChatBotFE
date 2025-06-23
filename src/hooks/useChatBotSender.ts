import { postQuestionToBot } from "@/api/postQuestionToBot";
import { useChatMessageStore } from "@/store/useStore";

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
      const reply = response.data.data.reply;

      removeTyping();
      addMessages([{ role: "bot", message: reply }]);
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
