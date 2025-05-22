import { getTrackingCustomerClearance } from "@/api/getTrackingStatus";
import { isCargoNumber } from "@/lib/utils/utils";
import { ChatMessage } from "@/types/components/chat/types";
import { TrackingCustomerClearanceType } from "@/types/lib/chat/handlers/types";

export const handleTrackingCustomerClearance: TrackingCustomerClearanceType =
  async (text, isWaiting) => {
    const messages: ChatMessage[] = [];

    const trackingKeyword =
      text.includes("통관") && text.includes("진행") && text.includes("조회");
    const cargoNumber = isCargoNumber({ text });

    if (cargoNumber) {
      try {
        const data = await getTrackingCustomerClearance(cargoNumber);
        messages.push({
          role: "bot",
          message: `통관 진행 조회 결과: ${JSON.stringify(data)}`,
        });
      } catch {
        messages.push({
          role: "bot",
          message: "화물 조회 중 오류가 발생했어요.",
        });
      }
      return { handled: true, messages, continueWaiting: false };
    }

    if (trackingKeyword) {
      messages.push({
        role: "bot",
        message: "화물관리번호를 입력해 주세요. 예: AB12-1234567-ABCDEFGH",
      });
      return { handled: true, messages, continueWaiting: true };
    }

    if (isWaiting) {
      messages.push({
        role: "bot",
        message: "올바른 화물관리번호 형식을 입력해 주세요.",
      });
      return { handled: true, messages, continueWaiting: true };
    }

    return { handled: false, messages: [], continueWaiting: isWaiting };
  };
