import React from 'react'
import { CodeBlock } from '../components/CodeBlock'
import { Image } from '../components/Image'

type IdentityProps = {
  children: React.ReactElement
}

function IdentityBlock(props: IdentityProps): React.ReactElement {
  return props.children
}

export default {
  pre: IdentityBlock,
  code: CodeBlock,
  Image,
}
