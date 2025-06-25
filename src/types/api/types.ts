export type ProgressDetailsType = {
  datetime: string;
  status: string;
  comment: string;
};

export interface BotResponse {
  reply: string | null;
  success: boolean | null;
  progressDetails: ProgressDetailsType[];
  errorReason: string | null;
}
