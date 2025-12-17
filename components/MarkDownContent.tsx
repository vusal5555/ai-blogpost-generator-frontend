import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const components: Components = {
    h1: ({ children, ...props }) => (
      <h1 className="text-xl font-bold text-white mb-3 mt-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-lg font-semibold text-slate-200 mb-2 mt-3" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-base font-medium text-slate-300 mb-2 mt-2" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-slate-300 mb-2 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="list-disc list-inside text-slate-300 space-y-1 mb-3 ml-2"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="list-decimal list-inside text-slate-300 space-y-1 mb-3 ml-2"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-slate-300" {...props}>
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="text-white font-semibold" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="text-slate-200 italic" {...props}>
        {children}
      </em>
    ),
    hr: (props) => <hr className="border-slate-700 my-4" {...props} />,
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-violet-500 pl-4 py-2 my-3 bg-slate-800/30 rounded-r"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      const isInline = !className;

      if (isInline) {
        return (
          <code
            className="bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code
          className="block bg-slate-800 text-cyan-400 p-3 rounded my-2 text-sm overflow-x-auto"
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
