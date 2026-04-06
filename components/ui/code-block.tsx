"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { codeToHtml } from "shiki"

export type CodeBlockProps = {
  children?: React.ReactNode
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        // min-w-0 prevents flexbox layout blowouts when shrinking
        "not-prose flex w-full min-w-0 flex-col overflow-clip border my-4",
        "border-border bg-card text-card-foreground rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export type CodeBlockCodeProps = {
  code: string
  language?: string
  theme?: string
  className?: string
} & React.HTMLProps<HTMLDivElement>

function CodeBlockCode({
  code,
  language = "tsx",
  theme,
  className,
  ...props
}: CodeBlockCodeProps) {
  const { resolvedTheme } = useTheme()
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function highlight() {
      if (!code) {
        if (isMounted) setHighlightedHtml("<pre><code></code></pre>")
        return
      }

      const codeTheme = theme ?? (resolvedTheme === "dark" ? "github-dark" : "github-light")

      try {
        const html = await codeToHtml(code, { lang: language, theme: codeTheme })
        if (isMounted) setHighlightedHtml(html)
      } catch (error) {
        // Fallback if language is unsupported by shiki
        if (isMounted) setHighlightedHtml(`<pre><code>${code}</code></pre>`)
      }
    }
    highlight()

    return () => { isMounted = false }
  }, [code, language, theme, resolvedTheme])

  const classNames = cn(
    "w-full overflow-x-auto text-[13px]",
    "[&>pre]:px-4 [&>pre]:py-4 [&>pre]:whitespace-pre-wrap [&>pre]:break-words [&>pre]:bg-transparent",

    // if we decide to use scrolling instead of wrapping, use this:
    // "[&>pre]:px-4 [&>pre]:py-4 [&>pre]:min-w-max [&>pre]:bg-transparent",
    className
  )

  return highlightedHtml ? (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  ) : (
    <div className={classNames} {...props}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn("flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock }