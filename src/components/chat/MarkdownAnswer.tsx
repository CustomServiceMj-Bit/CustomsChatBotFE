import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownAnswer = ({ answer }: { answer: string }) => {
  return (
    <div className="w-fit break-keep whitespace-pre-line">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
    </div>
  );
};

export default MarkdownAnswer;
