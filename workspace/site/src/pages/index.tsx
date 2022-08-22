/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useMemo } from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import lunr from 'lunr'
import { PostLink } from '../components/PostLink'
import { SearchBar } from '../components/SearchBar'
import { Banner } from '../components/Banner'
import { NetworkAnimation } from '../components/NetworkAnimation'

type LunrIndex = {
  lunrIndex: string
}

type IndexPageProps = {
  allMdx: LunrIndex & Graph<MdxPostSummary>
}

function makePostSummary(post: MdxPostSummary): React.ReactElement {
  const {
    id,
    frontmatter: { publish, title, date },
    fields: { slug },
    timeToRead,
    excerpt,
  } = post
  return (
    <PostLink
      datePosted={new Date(date)}
      key={id}
      published={publish}
      timeToRead={timeToRead}
      title={title}
      to={slug}
    >
      {excerpt}
    </PostLink>
  )
}

function enhanceQuery(query: string): string {
  return query
    .replace(/([~^+\\:-])/g, '\\$1')
    .trim()
    .split(/\s+/)
    .map((q) => `${q}*`)
    .join(' ')
}

export default function IndexPage(
  props: Data<IndexPageProps>
): React.ReactElement {
  const { lunrIndex } = props.data.allMdx
  const [query, setQuery] = useState('')

  const idx = useMemo(() => {
    return lunr.Index.load(JSON.parse(lunrIndex))
  }, [lunrIndex])

  const q = enhanceQuery(query)
  console.log(q)
  const idsOfPost = new Set(idx.search(q).map((r) => r.ref))
  const posts = props.data.allMdx.edges.filter(({ node }) =>
    idsOfPost.has(node.id)
  )

  return (
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr 1fr'],
        columnGap: 4,
        rowGap: 4,
      }}
    >
      <div
        sx={{
          gridColumn: '1 / -1',
        }}
      >
        <Banner
          bg={<NetworkAnimation />}
          subtitle="I like to write about all things that make software engineering fun"
          title="Blog"
        />
      </div>
      <div
        sx={{
          gridColumn: '1 / -1',
        }}
      >
        <SearchBar
          onChange={(query: string) => {
            setQuery(query)
          }}
        />
      </div>
      {posts.length > 0 ? (
        posts.map(({ node }) => makePostSummary(node))
      ) : (
        <div
          sx={{
            textAlign: 'center',
            gridColumn: '1 / -1',
            fontSize: 4,
            fontWeight: 'bold',
          }}
        >
          No posts found{' '}
          <span aria-label="frowning face" role="img">
            🙁
          </span>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query IndexPage {
    allMdx(filter: { frontmatter: { publish: { eq: true } } }) {
      lunrIndex
      edges {
        node {
          id
          ...PostLink
        }
      }
    }
  }
`
