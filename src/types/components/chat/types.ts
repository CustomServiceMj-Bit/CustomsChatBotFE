export interface ChatMessage {
  role: "user" | "bot";
  message: string;
}

export interface ChatContainerProps {
  messages: ChatMessage[];
}

export interface ChatLogProps {
  messages: ChatMessage[];
}

export interface CargoStatus {
  datetime: string;
  status: string;
  comment?: string;
}

export interface CargoTrackingTimelineProps {
  data: CargoStatus[];
}
