/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ImageDataLike } from 'gatsby-plugin-image'
import components from '../gatsby-plugin-theme-ui/components'
import { TableOfContents } from '../components/TableOfContents'
import { PostHeading } from '../components/PostHeading'
import { ColumnLayout } from '../components/ColumnLayout'

type PostTemplateProps = {
  mdx: MdxPost
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
    <ColumnLayout
      header={
        <PostHeading
          datePosted={datePosted}
          published={frontmatter.publish}
          timeToRead={timeToRead}
          title={frontmatter.title}
        />
      }
      left={<TableOfContents items={tableOfContents.items} />}
    >
      <MDXProvider components={components}>
        <MDXRenderer localImages={localImages} remoteImages={remoteImages}>
          {body}
        </MDXRenderer>
      </MDXProvider>
    </ColumnLayout>
  )
}

export const postQuery = graphql`
  fragment ImageWithName on FileWithName {
    key
    image {
      childImageSharp {
        gatsbyImageData(placeholder: TRACED_SVG, layout: FULL_WIDTH)
      }
    }
  }

  fragment EmbeddedImages on Mdx {
    frontmatter {
      embeddedImagesLocal {
        ...ImageWithName
      }
      embeddedImagesRemote {
        ...ImageWithName
      }
    }
  }

  query PostTemplateQuery($id: String) {
    mdx(id: { eq: $id }) {
      ...EmbeddedImages
      ...PostHeading
      ...TableOfContents
      body
    }
  }
`
