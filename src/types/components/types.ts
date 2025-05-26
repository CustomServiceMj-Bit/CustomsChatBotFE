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
  isActive: boolean;
  onClick: () => void;
}

export interface QuestionChipListProps {
  list: string[];
  onChipClick: (text: string) => void;
  activeChip: string | null;
}

/** InputContainer Props */
export interface InputContainerProps {
  onSend: (test: string) => void;
}
