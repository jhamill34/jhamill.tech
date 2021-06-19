/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { PostLink } from '../components/PostLink'
import { SearchBar } from '../components/SearchBar'

type IndexPageProps = {
  allMdx: Graph<MdxPostSummary>
}

function makePostSummary(post: MdxPostSummary): React.ReactElement {
  const {
    frontmatter: { publish, title, date },
    fields: { slug },
    timeToRead,
    excerpt,
  } = post
  return (
    <PostLink
      datePosted={new Date(date)}
      published={publish}
      timeToRead={timeToRead}
      title={title}
      to={slug}
    >
      {excerpt}
    </PostLink>
  )
}

export default function IndexPage(
  props: Data<IndexPageProps>
): React.ReactElement {
  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr 1fr'],
        columnGap: 4,
        rowGap: 4,
      }}
    >
      <SearchBar />

      {props.data.allMdx.edges.map(({ node }) => makePostSummary(node))}
    </div>
  )
}

export const query = graphql`
  query IndexPage {
    allMdx {
      edges {
        node {
          ...PostLink
        }
      }
    }
  }
`
