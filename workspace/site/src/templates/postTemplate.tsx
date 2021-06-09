/** @jsxRuntime classic */
/** @jsx jsx */
import { graphql, Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { jsx } from 'theme-ui'
import dateFormat from 'dateformat'
import { ImageDataLike } from 'gatsby-plugin-image'
import { CodeBlock } from '../components/CodeBlock'
import { Image } from '../components/Image'

type TableOfContentsLink = Link & {
  items: [TableOfContentsLink]
}

type ImageWithKey = {
  key: string
  image: ImageDataLike
}

type PostTemplateProps = {
  mdx: {
    body: string
    frontmatter: {
      title: string
      date: string
      publish: boolean
      embeddedImagesLocal: [ImageWithKey]
      embeddedImagesRemote: [ImageWithKey]
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

const components = {
  pre: (props: { children: React.ReactElement }): React.ReactElement =>
    props.children,
  code: CodeBlock,
  Image,
}

export default function PostTemplate(
  props: Data<PostTemplateProps>
): React.ReactElement {
  const { frontmatter, body, timeToRead, tableOfContents } = props.data.mdx
  const datePosted = new Date(frontmatter.date)

  const localImages: Record<string, ImageDataLike> = {}
  frontmatter.embeddedImagesLocal?.forEach(
    (e) => (localImages[e.key] = e.image)
  )

  const remoteImages: Record<string, ImageDataLike> = {}
  frontmatter.embeddedImagesRemote?.forEach(
    (e) => (remoteImages[e.key] = e.image)
  )

  return (
    <div>
      <div
        sx={{
          marginBottom: 3,
        }}
      >
        {!frontmatter.publish && (
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

      <MDXProvider components={components}>
        <MDXRenderer localImages={localImages} remoteImages={remoteImages}>
          {body}
        </MDXRenderer>
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
        publish
        embeddedImagesLocal {
          key
          image {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
            }
          }
        }
        embeddedImagesRemote {
          key
          image {
            childImageSharp {
              gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
            }
          }
        }
      }
      tableOfContents
      timeToRead
      body
    }
  }
`
