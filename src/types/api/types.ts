export type ProgressDetailsType = {
  datetime: string;
  status: string;
  comment: string;
};

export interface BotResponse {
  reply: string | null;
  success: boolean | null;
  progress_details: ProgressDetailsType[];
  error_reason: string | null;
}
