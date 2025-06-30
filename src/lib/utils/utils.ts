import { ADDITIONAL_ANSWERS } from "@/constants/texts";

/** 랜덤으로 정해진 답변 중 하나를 골라서 반환 */

export const randomAnswer = () => {
  let randomIndexNumber = Math.floor(Math.random() * ADDITIONAL_ANSWERS.length);
  return ADDITIONAL_ANSWERS[randomIndexNumber];
};

/** 사용자 input에 보안 처리를 위한 정규식 필터링 함수 */

export const isMaliciousInput = (text: string) => {
  const pattern = /<[^>]*>|on\w+=["'][^"']*["']|javascript:/gi;
  return pattern.test(text);
};
