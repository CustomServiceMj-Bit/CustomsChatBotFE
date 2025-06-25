/** 랜덤으로 정해진 답변 중 하나를 골라서 반환 */

import { ADDITIONAL_ANSWERS } from "@/constants/texts";

export const randomAnswer = () => {
  let randomIndexNumber = Math.floor(Math.random() * ADDITIONAL_ANSWERS.length);
  return ADDITIONAL_ANSWERS[randomIndexNumber];
};
