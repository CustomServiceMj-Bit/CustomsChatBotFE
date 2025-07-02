"use client";

import Image from "next/image";
import CustomerClearanceTimeline from "./CustomerClearanceProgress";
import { useChatMessageStore } from "@/store/useStore";
import BotIcon from "/public/img/bot.svg";
import QuestionChipList from "../QuestionChipList";
import { useCallback, useEffect, useRef } from "react";
import { QUICK_QUESTION_CHIPS } from "@/constants/texts";
import { useChatBotSender } from "@/hooks/useChatBotSender";
import TypingBlock from "./TypingBlock";
import MarkdownAnswer from "./MarkdownAnswer";
import { ProgressDetailsType } from "@/types/api/types";

const ChatLog = () => {
  const messages = useChatMessageStore((state) => state.messages);

  const { sendMessage } = useChatBotSender();
  const onSend = async (text: string) => {
    await sendMessage(text);
  };

  const handleChipClick = useCallback(
    (text: string) => {
      onSend(text);
    },
    [onSend],
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messages.map((chat, idx) => {
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
                className={`max-w-[270px] rounded-lg px-3 py-2 ${
                  chat.role === "user" ? "bg-blue-100" : "mt-6 bg-gray-200"
                }`}
              >
                {chat.id === "typing" ? (
                  <TypingBlock />
                ) : chat.id === "progress" ? (
                  <CustomerClearanceTimeline
                    data={chat.message as ProgressDetailsType[]}
                  />
                ) : (
                  <MarkdownAnswer answer={chat.message as string} />
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
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatLog;
