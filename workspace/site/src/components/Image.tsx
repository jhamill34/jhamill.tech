/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { getImage, GatsbyImage, ImageDataLike } from 'gatsby-plugin-image'

type ImageProps = {
  image: ImageDataLike
  alt: string
}

export function Image(props: ImageProps): React.ReactElement {
  const image = getImage(props.image)

  if (image == undefined) {
    return <div>Image Not Found</div>
  }

  return (
    <GatsbyImage
      alt={props.alt}
      image={image}
      sx={{
        margin: 'auto',
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
      }}
    />
  )
}
