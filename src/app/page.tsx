"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import Header from "@/components/Header";
import InputContainer from "@/components/InputContainer";
import { handleTrackingCustomerClearance } from "@/lib/chat/handlers/handleTrackingCustomerClearance";
import { ChatMessage } from "@/types/components/chat/types";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", message: "안녕하세요! 무엇을 도와드릴까요?" },
  ]);
  const [isWaitingForCargoNumber, setIsWaitingForCargoNumber] = useState(false);

  const handleSendMessage = async (text: string) => {
    setMessages((prev) => [...prev, { role: "user", message: text }]);

    const handlers = [handleTrackingCustomerClearance];

    for (const handler of handlers) {
      const {
        handled,
        messages: botMessages,
        continueWaiting,
      } = await handler(text, isWaitingForCargoNumber);

      if (handled) {
        if (botMessages.length > 0) {
          setMessages((prev) => [...prev, ...botMessages]);
        }
        setIsWaitingForCargoNumber(continueWaiting);
        return;
      }
    }

    /* fallback
    setMessages((prev) => [
      ...prev,
      { role: "bot", message: "죄송해요, 해당 요청은 이해하지 못했어요." },
    ]);*/
  };

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-grow overflow-y-auto p-6">
        <ChatContainer messages={messages} />
      </div>
      <InputContainer onSend={handleSendMessage} />
    </div>
  );
}
