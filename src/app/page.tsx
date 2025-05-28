"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import Header from "@/components/Header";
import InputContainer from "@/components/InputContainer";
import { handleTrackingCustomerClearance } from "@/lib/chat/handlers/handleTrackingCustomerClearance";
import { useChatMessageStore } from "@/store/useStore";
import { useState } from "react";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-grow overflow-y-auto p-6">
        <ChatContainer />
      </div>
      <InputContainer />
    </div>
  );
}
