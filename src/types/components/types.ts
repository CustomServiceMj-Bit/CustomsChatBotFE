/** 아이콘 컴포넌트 Props */

export type IconSize = "xs" | "sm" | "md" | "lg";

export interface IconProps {
  src: string;
  alt: string;
  size: IconSize;
  className?: string;
}

/** Chip 컴포넌트 Props */
export interface ChipProps {
  text: string;
  onClick: () => void;
}

export interface QuestionChipListProps {
  list: string[];
  onChipClick: (text: string) => void;
}

/** AutoResizeTextarea 컴포넌트 Props */

export interface AutoResizeTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}
