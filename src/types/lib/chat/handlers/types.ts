import { ChatMessage } from "@/types/components/chat/types";

export interface TrackingCustomerClearanceResult {
  handled: boolean;
  messages: ChatMessage[];
  continueWaiting: boolean;
}

export type TrackingCustomerClearanceType = (
  text: string,
  isWaiting: boolean,
) => Promise<TrackingCustomerClearanceResult>;
