import { BOT_TYPING } from "@/constants/texts";

const TypingBlock = () => {
  return (
    <div className="w-[100px] text-sm">
      {BOT_TYPING}
      <span className="typing-dots" />
    </div>
  );
};

export default TypingBlock;
