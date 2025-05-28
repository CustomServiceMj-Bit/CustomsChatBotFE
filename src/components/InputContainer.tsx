"use client";

import { useCallback, useState } from "react";
import Icon from "./Icon";
import QuestionChipList from "./QuestionChipList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import SendIcon from "/public/icon/send.svg";
import {
  INPUT_PLACEHOLDER,
  QUICK_QUESTION_CHIPS,
  QUICK_QUESTION_TEXT,
} from "@/constants/texts";
import { useChatMessageStore } from "@/store/useStore";
import { handleTrackingCustomerClearance } from "@/lib/chat/handlers/handleTrackingCustomerClearance";

const InputContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

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
      setActiveChip(text);
    },
    [onSend],
  );

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    onSend(trimmedValue);
    setInputValue("");
  };

  return (
    <div className="flex h-40 flex-col gap-4 bg-white p-4">
      <p className="text-xs text-gray-500">{QUICK_QUESTION_TEXT}</p>
      <QuestionChipList
        list={QUICK_QUESTION_CHIPS}
        onChipClick={handleChipClick}
        activeChip={activeChip}
      />
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
