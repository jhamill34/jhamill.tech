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
        marginBottom: 3,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'dark',
        position: 'relative',
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        sx={{
          fontSize: 1,
          p: 2,
          textAlign: 'center',
          color: 'muted',
          fontFamily: 'monospace',
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
          color: 'muted',
          cursor: 'pointer',
          border: 0,
          right: 3,
          bottom: 3,
          borderRadius: 4,
          fontSize: 1,
          p: 2,
          m: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          fontFamily: 'body',
          fontWeight: 'body',
          lineHeight: 'body',
        }}
      >
        {copied ? `Copied!` : `Copy`}
      </button>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          backgroundColor: 'transparent',
        }}
        language={language}
        showLineNumbers
        style={style}
        sx={{}}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
