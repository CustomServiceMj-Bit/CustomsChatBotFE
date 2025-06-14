import Image from "next/image";
import CustomerClearanceTimeline from "./CustomerClearanceTimeline";
import { useChatMessageStore } from "@/store/useStore";
import BotIcon from "/public/img/bot.svg";
import QuestionChipList from "../QuestionChipList";
import { useCallback, useState } from "react";
import { handleTrackingCustomerClearance } from "@/lib/chat/handlers/handleTrackingCustomerClearance";
import { QUICK_QUESTION_CHIPS } from "@/constants/texts";

const ChatLog = () => {
  const messages = useChatMessageStore((state) => state.messages);
  const addMessages = useChatMessageStore((state) => state.addMessages);
  const [isWaitingForCargoNumber, setIsWaitingForCargoNumber] = useState(false);

  const onSend = async (text: string) => {
    addMessages([{ role: "user", message: text }]);

    /** 추후 api 나오면 수정 필요 */
    const handlers = [handleTrackingCustomerClearance];

    for (const handler of handlers) {
      const {
        handled,
        messages: botMessages,
        continueWaiting,
      } = await handler(text, isWaitingForCargoNumber);

      if (handled) {
        if (botMessages.length > 0) {
          addMessages(botMessages);
        }
        setIsWaitingForCargoNumber(continueWaiting);
        return;
      }
    }
  };

  const handleChipClick = useCallback(
    (text: string) => {
      onSend(text);
    },
    [onSend],
  );

  return (
    <div className="flex flex-col gap-3">
      {messages.map((chat, idx) => {
        const isTrackingData =
          chat.role === "bot" &&
          chat.message.startsWith("통관 진행 조회 결과:") &&
          chat.message.includes("status");

        let parsedData = null;
        if (isTrackingData) {
          try {
            const raw = chat.message.replace("통관 진행 조회 결과: ", "");
            parsedData = JSON.parse(raw);
          } catch (e) {
            console.log(e);
          }
        }

        return (
          <div
            key={idx}
            className={`flex flex-col gap-1 ${
              chat.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-start">
              {chat.role === "bot" && (
                <div className="mr-2 h-10 w-10 overflow-hidden">
                  <Image src={BotIcon} alt="bot-icon" />
                </div>
              )}

              <div
                className={`max-w-[290px] rounded-lg px-3 py-2 text-sm ${
                  chat.role === "user"
                    ? "self-end bg-blue-100 text-left"
                    : "mt-8 self-start bg-gray-200"
                }`}
              >
                {isTrackingData && parsedData ? (
                  <CustomerClearanceTimeline data={parsedData} />
                ) : (
                  chat.message
                )}
              </div>
            </div>
            {idx === 0 && chat.role === "bot" && (
              <QuestionChipList
                list={QUICK_QUESTION_CHIPS}
                onChipClick={handleChipClick}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatLog;
