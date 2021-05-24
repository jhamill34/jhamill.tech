/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'

export default function IndexPage(): React.ReactElement {
  return (
    <div
      sx={{
        backgroundColor: 'lavender',
        p: 4,
        color: 'red',
        fontFamily: 'cursive',
      }}
    >
      Hello world
    </div>
  )
}
