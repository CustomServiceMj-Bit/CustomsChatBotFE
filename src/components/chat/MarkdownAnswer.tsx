import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useFontSizeStore } from "@/store/useStore";

const MarkdownAnswer = ({ answer }: { answer: string }) => {
  const { fontSize } = useFontSizeStore();

  return (
    <div className={`text-left ${fontSize === "xl" ? "text-xl" : "text-sm"}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
      >
        {answer}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownAnswer;
