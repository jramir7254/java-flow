import { cn } from "@/lib/utils"
import { memo } from "react"
import ReactMarkdown, { Components } from "react-markdown"
import remarkBreaks from "remark-breaks"
import remarkGfm from "remark-gfm"
import { CodeBlock, CodeBlockCode } from "./code-block"

export type MarkdownProps = {
  children: string
  className?: string
  components?: Partial<Components>
}

const INITIAL_COMPONENTS: Partial<Components> = {
  h1: ({ children, ...props }) => <h1 {...props} className="text-3xl font-bold mt-8 mb-4 tracking-tight">{children}</h1>,
  h2: ({ children, ...props }) => <h2 {...props} className="text-2xl font-bold mt-8 mb-4 tracking-tight border-b pb-2 border-border">{children}</h2>,
  h3: ({ children, ...props }) => <h3 {...props} className="text-xl font-semibold mt-6 mb-3 tracking-tight">{children}</h3>,
  h4: ({ children, ...props }) => <h4 {...props} className="text-lg font-semibold mt-6 mb-3 tracking-tight">{children}</h4>,
  h5: ({ children, ...props }) => <h5 {...props} className="text-base font-semibold mt-4 mb-2 tracking-tight">{children}</h5>,
  h6: ({ children, ...props }) => <h6 {...props} className="text-sm font-semibold mt-4 mb-2 tracking-tight text-muted-foreground">{children}</h6>,

  p: function PComponent({ className, children, ...props }) {
    return <p {...props} className={cn("mb-5 leading-7", className)}>{children}</p>
  },

  a: ({ className, children, ...props }) => (
    <a {...props} className={cn("font-medium text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary", className)}>
      {children}
    </a>
  ),

  ul: ({ className, children, ...props }) => (
    <ul {...props} className={cn("my-5 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  ),

  ol: ({ className, children, ...props }) => (
    <ol {...props} className={cn("my-5 ml-6 list-decimal [&>li]:mt-2", className)}>
      {children}
    </ol>
  ),

  li: ({ className, children, ...props }) => (
    <li {...props} className={cn("leading-7", className)}>
      {children}
    </li>
  ),

  blockquote: ({ className, children, ...props }) => (
    <blockquote {...props} className={cn("mt-6 mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground", className)}>
      {children}
    </blockquote>
  ),

  hr: ({ ...props }) => <hr {...props} className="my-8 border-border" />,

  table: ({ className, children, ...props }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table {...props} className={cn("w-full", className)}>
        {children}
      </table>
    </div>
  ),

  tr: ({ className, children, ...props }) => (
    <tr {...props} className={cn("m-0 border-t border-border p-0 even:bg-muted/50", className)}>
      {children}
    </tr>
  ),

  th: ({ className, children, ...props }) => (
    <th {...props} className={cn("border border-border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right", className)}>
      {children}
    </th>
  ),

  td: ({ className, children, ...props }) => (
    <td {...props} className={cn("border border-border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right", className)}>
      {children}
    </td>
  ),

  strong: ({ className, children, ...props }) => (
    <strong {...props} className={cn("font-semibold", className)}>
      {children}
    </strong>
  ),

  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "")
    const isInline = inline || !match

    if (isInline) {
      return (
        <code
          className={cn(
            "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            className
          )}
          {...props}
        >
          {children}
        </code>
      )
    }

    const language = match ? match[1] : "plaintext"

    return (
      <CodeBlock className={className}>
        <CodeBlockCode code={String(children).replace(/\n$/, "")} language={language} />
      </CodeBlock>
    )
  }
}

function MarkdownComponent({
  children,
  className,
  components = INITIAL_COMPONENTS,
}: MarkdownProps) {
  return (
    <div
      className={cn(
        "w-full min-w-0 text-foreground",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
const Markdown = memo(MarkdownComponent)
Markdown.displayName = "Markdown"

export { Markdown }