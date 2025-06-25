import { ProgressDetailsType } from "@/types/api/types";

export interface ChatMessage {
  role: "user" | "bot";
  message: string | ProgressDetailsType[];
  id?: "typing" | "progress" | "markdown";
}

export interface CustomsClearanceProgressProps {
  data: ProgressDetailsType[];
}
