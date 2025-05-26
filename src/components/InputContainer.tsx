"use client";

import { useCallback, useState } from "react";
import Icon from "./Icon";
import QuestionChipList from "./QuestionChipList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import SendIcon from "/public/icon/send.svg";
import { InputContainerProps } from "@/types/components/types";
import { QUICK_QUESTION_CHIPS } from "@/constants/components/constants";

const InputContainer = ({ onSend }: InputContainerProps) => {
  const [inputValue, setInputValue] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    onSend(trimmedValue);
    setInputValue("");
  };

  const handleChipClick = useCallback(
    (text: string) => {
      onSend(text);
      setActiveChip(text);
    },
    [onSend],
  );

  return (
    <div className="flex h-40 flex-col gap-4 bg-white p-4">
      <p className="text-xs text-gray-500">버튼으로 빠르게 질문해보세요!</p>
      <QuestionChipList
        list={QUICK_QUESTION_CHIPS}
        onChipClick={handleChipClick}
        activeChip={activeChip}
      />
      <div className="grid grid-cols-6 gap-2">
        <Input
          className="col-span-5 h-10"
          placeholder="질문을 입력하세요"
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
