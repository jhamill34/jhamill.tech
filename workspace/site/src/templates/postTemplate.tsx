/** @jsxRuntime classic */
/** @jsx jsx */
import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { jsx } from 'theme-ui'
import dateFormat from 'dateformat'

type TableOfContentsLink = Link & {
  items: [TableOfContentsLink]
}

type PostTemplateProps = {
  mdx: {
    body: string
    frontmatter: {
      title: string
      date: string
      draft: boolean
    }
    tableOfContents: {
      items: [TableOfContentsLink]
    }
    timeToRead: number
  }
}

function renderTableOfContents(item: TableOfContentsLink): React.ReactElement {
  return (
    <div
      key={item.title}
      sx={{
        marginLeft: 3,
      }}
    >
      <GatsbyLink
        sx={{
          color: 'text',
          textDecoration: 'none',
          borderBottom: '2px solid transparent',
          transition: 'all 0.2s ease-in-out',
          ':hover, :focus': {
            color: 'primary',
            borderBottomColor: 'primary',
          },
        }}
        to={item.url}
      >
        {item.title}
      </GatsbyLink>
      {item.items && item.items.map(renderTableOfContents)}
    </div>
  )
}

export default function PostTemplate(
  props: Data<PostTemplateProps>
): React.ReactElement {
  const { frontmatter, body, timeToRead, tableOfContents } = props.data.mdx
  const datePosted = new Date(frontmatter.date)

  return (
    <div>
      <div
        sx={{
          marginBottom: 3,
        }}
      >
        {frontmatter.draft && (
          <div
            sx={{
              fontWeight: 'heading',
              color: 'primary',
            }}
          >
            [DRAFT]
          </div>
        )}
        <div sx={{ variant: 'post.title' }}>{frontmatter.title}</div>
        <div sx={{ variant: 'post.metadata' }}>
          <div>
            {dateFormat(datePosted, 'mmmm dS, yyyy')} &middot; {timeToRead} min
            read
          </div>
        </div>
      </div>

      <div sx={{}}>
        <div
          sx={{
            fontWeight: 'heading',
            fontFamily: 'heading',
            fontSize: 2,
          }}
        >
          Table Of Contents
        </div>
        {tableOfContents.items.map(renderTableOfContents)}
      </div>

      <MDXProvider components={{}}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </div>
  )
}

export const postQuery = graphql`
  query PostTemplateQuery($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        draft
      }
      tableOfContents
      timeToRead
      body
    }
  }
`
