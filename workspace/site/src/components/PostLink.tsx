/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql, Link as GatsbyLink } from 'gatsby'
import dateFormat from 'dateformat'

type PostLinkProps = {
  to: string
  title: string
  published: boolean
  timeToRead: number
  datePosted: Date
  children: string
}

export function PostLink(props: PostLinkProps): React.ReactElement {
  const { title, published, timeToRead, datePosted, to, children } = props

  return (
    <GatsbyLink
      sx={{
        color: 'text',
        textDecoration: 'none',
        display: 'block',
        p: 3,
        borderRadius: 8,
        position: 'relative',
        borderLeftWidth: 6,
        borderLeftStyle: 'solid',
        borderLeftColor: 'transparent',
        boxShadow: '0 4px 5px rgba(0, 0, 0, 0.3)',
        transition:
          'border-left-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        ':hover,:focus': {
          borderLeftColor: 'primary',
          boxShadow: '0 6px 10px rgba(0, 0, 0, 0.2)',
        },
      }}
      to={to}
    >
      {!published && (
        <div
          sx={{
            position: 'absolute',
            top: 3,
            right: 3,
            fontWeight: 'heading',
            color: 'warning',
          }}
        >
          [DRAFT]
        </div>
      )}
      <div
        sx={{
          fontWeight: 'heading',
          lineHeight: 'heading',
          fontFamily: 'heading',
          fontSize: 4,
        }}
      >
        {title}
      </div>
      <div sx={{ variant: 'post.metadata' }}>
        <div>
          {dateFormat(datePosted, 'mmmm dS, yyyy')} &middot; {timeToRead} min
          read
        </div>
      </div>
      <div sx={{ my: 3 }}>{children}</div>
      <div
        sx={{
          fontStyle: 'italic',
          color: 'muted',
          fontSize: 1,
        }}
      >
        Read more
      </div>
    </GatsbyLink>
  )
}

export const fragment = graphql`
  fragment PostLink on Mdx {
    excerpt(pruneLength: 255)
    frontmatter {
      title
      date
      publish
    }
    timeToRead
    fields {
      slug
    }
  }
`
