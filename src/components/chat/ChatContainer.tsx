import ChatLog from "./ChatLog";
import { ChatContainerProps } from "@/types/components/chat/types";

const ChatContainer = ({ messages }: ChatContainerProps) => {
  return (
    <div>
      <ChatLog messages={messages} />
    </div>
  );
};

export default ChatContainer;
