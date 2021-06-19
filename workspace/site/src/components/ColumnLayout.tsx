/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

type ColumLayoutProps = {
  header?: React.ReactElement
  left?: React.ReactElement
  children: React.ReactElement
}

export function ColumnLayout(props: ColumLayoutProps): React.ReactElement {
  const { header, left, children } = props

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 60% 1fr'],
        gridTemplateAreas: [
          '"header" "left" "body"',
          '"header" "left" "body"',
          '". header ." "left body body"',
        ],
      }}
    >
      <div sx={{ gridArea: 'header', minWidth: 0 }}>{header}</div>
      <div sx={{ gridArea: 'left', minWidth: 0 }}>{left}</div>
      <div sx={{ gridArea: 'body', minWidth: 0 }}>{children}</div>
    </div>
  )
}
