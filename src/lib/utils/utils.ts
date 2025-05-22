import { isCargoNumberProps } from "@/types/lib/utils/types";

/**화물 관리 번호 포함 여부. 포함하고 있다면 화물 관리 번호를 return */
export const isCargoNumber = ({ text }: isCargoNumberProps) => {
  const match = text.match(/([A-Z0-9]{11})-([A-Z0-9]{4})-([A-Z0-9]{4})/i);
  return match?.[0] ?? null;
};
