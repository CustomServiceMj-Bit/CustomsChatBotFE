"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import Header from "@/components/Header";
import InputContainer from "@/components/InputContainer";
import { INIT_BOT_MESSAGE } from "@/constants/texts";
import { handleTrackingCustomerClearance } from "@/lib/chat/handlers/handleTrackingCustomerClearance";
import { ChatMessage } from "@/types/components/chat/types";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", message: INIT_BOT_MESSAGE },
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
