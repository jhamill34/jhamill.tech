/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { jsx } from 'theme-ui'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/prism'
import copy from 'copy-to-clipboard'

type CodeBlockProps = {
  title: string
  children: string
  className: string
}

export function CodeBlock({
  title,
  children,
  className,
}: CodeBlockProps): React.ReactElement {
  const language = className.replace('language-', '')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  })

  return (
    <div
      sx={{
        variant: 'code.root',
        position: 'relative',
      }}
    >
      <div
        sx={{
          variant: 'code.title',
        }}
      >
        {title ? `${title}.${language}` : `${language}`}
      </div>
      <button
        onClick={() => {
          copy(children.trim())
          setCopied(true)
        }}
        sx={{
          position: 'absolute',
          border: 0,
          right: 3,
          bottom: 3,
          variant: 'code.button',
        }}
      >
        {copied ? `Copied!` : `Copy`}
      </button>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          backgroundColor: 'transparent',
          fontSize: null,
        }}
        language={language}
        showLineNumbers
        style={style}
        sx={{
          fontSize: [0, 1, 2],
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
