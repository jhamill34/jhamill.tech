/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

type BannerProps = {
  title: string
  subtitle: string
  bg: React.ReactNode
}

export function Banner(props: BannerProps): React.ReactElement {
  return (
    <div
      sx={{
        p: 6,
        position: 'relative',
      }}
    >
      <div
        sx={{
          fontSize: 7,
          textAlign: 'center',
          fontWeight: 'heading',
        }}
      >
        {props.title}
      </div>
      <div
        sx={{
          textAlign: 'center',
          color: 'muted',
        }}
      >
        {props.subtitle}
      </div>
      <div
        sx={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {props.bg}
      </div>
    </div>
  )
}
