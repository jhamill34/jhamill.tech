/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link as GatsbyLink, graphql } from 'gatsby'

type TableOfContentsProps = {
  items: [TableOfContentsLink]
}

function makeTableOfContents(
  items: [TableOfContentsLink],
  previousTag = ''
): React.ReactElement[] {
  return items.map((item, ndx) => {
    const tag = `${previousTag}${ndx + 1}`

    return (
      <li key={item.title} sx={{ paddingTop: 2 }}>
        <GatsbyLink
          sx={{
            variant: 'post.toc.link',
          }}
          to={item.url}
        >
          {tag} {item.title}
        </GatsbyLink>
        {item.items && (
          <ul sx={{ paddingLeft: 3, listStyleType: 'none' }}>
            {makeTableOfContents(item.items, tag + '.')}
          </ul>
        )}
      </li>
    )
  })
}

export function TableOfContents({
  items,
}: TableOfContentsProps): React.ReactElement {
  return (
    <div>
      <div
        sx={{
          variant: 'post.toc.heading',
        }}
      >
        Table Of Contents
      </div>
      <ul sx={{ paddingLeft: 3, listStyleType: 'none' }}>
        {makeTableOfContents(items)}
      </ul>
    </div>
  )
}

export const fragment = graphql`
  fragment TableOfContents on Mdx {
    tableOfContents
  }
`
