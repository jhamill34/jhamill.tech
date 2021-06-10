/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import dateFormat from 'dateformat'

type PostHeadingProps = {
  title: string
  published: boolean
  timeToRead: number
  datePosted: Date
}

export function PostHeading(props: PostHeadingProps): React.ReactElement {
  const { title, published, timeToRead, datePosted } = props

  return (
    <div>
      {!published && (
        <div
          sx={{
            fontWeight: 'heading',
            color: 'warning',
          }}
        >
          [DRAFT]
        </div>
      )}
      <div sx={{ variant: 'post.title' }}>{title}</div>
      <div sx={{ variant: 'post.metadata' }}>
        <div>
          {dateFormat(datePosted, 'mmmm dS, yyyy')} &middot; {timeToRead} min
          read
        </div>
      </div>
    </div>
  )
}

export const fragment = graphql`
  fragment PostHeading on Mdx {
    frontmatter {
      title
      date
      publish
    }
    timeToRead
  }
`
