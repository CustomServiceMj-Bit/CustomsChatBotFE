"use client";

import { useState } from "react";
import Icon from "./Icon";
import { Button } from "./ui/button";

import SendIcon from "/public/icon/send.svg";
import { TOAST_MESSAGES } from "@/constants/texts";
import { useChatBotSender } from "@/hooks/useChatBotSender";
import { toast } from "sonner";

import AutoResizeTextarea from "./AutoResizeTextarea";
import FontSizeDrawer from "./FontSizeDrawer";

const InputContainer = () => {
  const [inputValue, setInputValue] = useState("");

  const { sendMessage } = useChatBotSender();
  const onSend = async (text: string) => {
    await sendMessage(text);
  };

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      toast(TOAST_MESSAGES.BLANK_TEXT);
      return;
    }
    onSend(trimmedValue);
    setInputValue("");
  };

  return (
    <div className="flex h-auto flex-col gap-4 bg-white p-4">
      <div className="grid grid-cols-7 items-center gap-2">
        <div className="col-span-1">
          <FontSizeDrawer />
        </div>
        <div className="col-span-5">
          <AutoResizeTextarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                if (e.shiftKey) {
                  return;
                }
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
        </div>
        <Button
          variant="ghost"
          className="border-input col-span-1 h-full border shadow-xs"
          onClick={handleSubmit}
        >
          <Icon src={SendIcon} alt="send-icon" size="lg" />
        </Button>
      </div>
    </div>
  );
};

export default InputContainer;
