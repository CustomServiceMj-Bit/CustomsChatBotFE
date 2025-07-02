import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

const MarkdownAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="text-left text-sm">
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
