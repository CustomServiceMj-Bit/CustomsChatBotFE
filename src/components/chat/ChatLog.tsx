import Image from "next/image";
import CustomerClearanceTimeline from "./CustomerClearanceTimeline";
import { useChatMessageStore } from "@/store/useStore";
import BotIcon from "/public/img/bot.svg";

const ChatLog = () => {
  const messages = useChatMessageStore((state) => state.messages);

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
            className={`flex items-start ${
              chat.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {chat.role === "bot" && (
              <div className="mr-2 h-10 w-10 overflow-hidden">
                <Image src={BotIcon} alt="bot-icon" />
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-lg px-4 py-2 text-sm ${
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
        );
      })}
    </div>
  );
};

export default ChatLog;
