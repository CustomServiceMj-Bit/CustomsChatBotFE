export interface ChatMessage {
  role: "user" | "bot";
  message: string;
}

export interface CargoStatus {
  datetime: string;
  status: string;
  comment?: string;
}

export interface CargoTrackingTimelineProps {
  data: CargoStatus[];
}
