"use client";

import { useState } from "react";
import Icon from "./Icon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import SendIcon from "/public/icon/send.svg";
import { INPUT_PLACEHOLDER } from "@/constants/texts";
import { useChatBotSender } from "@/hooks/useChatBotSender";

const InputContainer = () => {
  const [inputValue, setInputValue] = useState("");

  const { sendMessage } = useChatBotSender();
  const onSend = async (text: string) => {
    await sendMessage(text);
  };

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    onSend(trimmedValue);
    setInputValue("");
  };

  return (
    <div className="flex h-18 flex-col gap-4 bg-white p-4">
      <div className="grid grid-cols-6 gap-2">
        <Input
          className="col-span-5 h-10"
          placeholder={INPUT_PLACEHOLDER}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              handleSubmit();
            }
          }}
          value={inputValue}
        />
        <Button
          variant="ghost"
          className="border-input col-span-1 h-10 border shadow-xs"
          onClick={handleSubmit}
        >
          <Icon src={SendIcon} alt="send-icon" size="lg" />
        </Button>
      </div>
    </div>
  );
};

export default InputContainer;
