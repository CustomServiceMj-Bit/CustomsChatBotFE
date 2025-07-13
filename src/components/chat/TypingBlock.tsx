import { BOT_TYPING } from "@/constants/texts";
import { useFontSizeStore } from "@/store/useStore";

const TypingBlock = () => {
  const { fontSize } = useFontSizeStore();

  const textSize = fontSize === "xl" ? "text-xl" : "text-sm";
  const width = fontSize === "xl" ? "w-[150px]" : "w-[100px]";

  return (
    <div className={`${width} ${textSize}`}>
      {BOT_TYPING}
      <span className="typing-dots" />
    </div>
  );
};

export default TypingBlock;
