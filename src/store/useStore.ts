/** 메세지 */

import { INIT_BOT_MESSAGE } from "@/constants/texts";
import { ChatMessage } from "@/types/components/chat/types";
import { create } from "zustand";

interface ChatMessageStore {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  addMessages: (messsages: ChatMessage[]) => void;
  removeTyping: () => void;
}

export const useChatMessageStore = create<ChatMessageStore>((set) => ({
  messages: [{ role: "bot", message: INIT_BOT_MESSAGE }],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  addMessages: (messages) =>
    set((state) => ({
      messages: [...state.messages, ...messages],
    })),
  removeTyping: () =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== "typing"),
    })),
}));
