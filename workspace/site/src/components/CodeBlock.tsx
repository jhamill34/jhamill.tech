/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/prism'

type CodeBlockProps = {
  children: string
  className: string
}

export function CodeBlock({
  children,
  className,
}: CodeBlockProps): React.ReactElement {
  const language = className.replace('language-', '')

  return (
    <SyntaxHighlighter
      language={language}
      showLineNumbers
      style={style}
      sx={{
        borderRadius: 8,
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
}
