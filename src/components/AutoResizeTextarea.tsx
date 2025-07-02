"use client";

import { useEffect, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { AutoResizeTextareaProps } from "@/types/components/types";
import { INPUT_MAX_LENGTH } from "@/constants/constants";
import { INPUT_PLACEHOLDER } from "@/constants/texts";

const AutoResizeTextarea = ({
  value,
  onChange,
  onKeyUp,
}: AutoResizeTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
      placeholder={INPUT_PLACEHOLDER}
      maxLength={INPUT_MAX_LENGTH}
      className="overflow-y-aut max-h-16 min-h-10 resize-none text-sm"
    />
  );
};

export default AutoResizeTextarea;
