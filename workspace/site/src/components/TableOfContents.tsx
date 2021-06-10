/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Link as GatsbyLink, graphql } from 'gatsby'

type TableOfContentsProps = {
  items: [TableOfContentsLink]
}

function makeTableOfContents(
  items: [TableOfContentsLink]
): React.ReactElement[] {
  return items.map((item) => (
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
      {item.items && makeTableOfContents(item.items)}
    </div>
  ))
}

export function TableOfContents({
  items,
}: TableOfContentsProps): React.ReactElement {
  return (
    <div>
      <div
        sx={{
          fontWeight: 'heading',
          fontFamily: 'heading',
          fontSize: 2,
        }}
      >
        Table Of Contents
      </div>
      {makeTableOfContents(items)}
    </div>
  )
}

export const fragment = graphql`
  fragment TableOfContents on Mdx {
    tableOfContents
  }
`
