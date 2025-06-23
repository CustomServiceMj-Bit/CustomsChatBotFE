import { BOT_TYPING } from "@/constants/texts";

const TypingBlock = () => {
  return (
    <div className="w-[90px]">
      {BOT_TYPING}
      <span className="typing-dots" />
    </div>
  );
};

export default TypingBlock;
