import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useFontSizeStore } from "@/store/useStore";
import { customSanitizeSchema } from "@/lib/markdownConfig";
import remarkBreaks from "remark-breaks";

const MarkdownAnswer = ({ answer }: { answer: string }) => {
  const { fontSize } = useFontSizeStore();

  const insertLineBeforeDisclaimer = (text: string) => {
    return text.replace(/(\*\*본 답변은)/, "\n\n$1");
  };

  const formattedAnswer = insertLineBeforeDisclaimer(answer);

  return (
    <div
      className={`prose max-w-none text-left ${
        fontSize === "xl" ? "prose-xl" : "text-sm"
      } whitespace-pre-wrap [&_code]:rounded [&_code]:bg-zinc-200 [&_code]:px-1 [&_code]:py-[1px] [&_code]:font-mono [&_code]:text-xs [&_code]:text-red-400 [&_h2]:font-bold [&_h3]:font-bold [&_table]:w-full [&_table]:border [&_table]:border-zinc-400 [&_table]:bg-zinc-100 [&_td]:border [&_td]:border-zinc-400 [&_td]:p-2 [&_td]:align-top [&_th]:border [&_th]:border-zinc-400 [&_th]:p-2 [&_th]:text-left [&_thead]:bg-zinc-200`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[[rehypeSanitize, customSanitizeSchema]]}
      >
        {formattedAnswer}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownAnswer;
