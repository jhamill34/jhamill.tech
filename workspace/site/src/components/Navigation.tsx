/** @jsxRuntime classic */
/** @jsx jsx */
import { Link as GatsbyLink } from 'gatsby'
import { jsx } from 'theme-ui'
import React from 'react'

type NavigationProps = {
  title: string
  links: [Link]
}

export function Navigation(props: NavigationProps): React.ReactElement {
  return (
    <nav
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        variant: 'nav.root',
      }}
    >
      <div
        sx={{
          variant: 'nav.left',
        }}
      >
        <GatsbyLink
          sx={{
            display: 'block',
            variant: 'nav.link',
          }}
          to="/"
        >
          {props.title}
        </GatsbyLink>
      </div>
      <ul
        sx={{
          display: 'flex',
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          variant: 'nav.right',
        }}
      >
        {props.links.map((l) => (
          <li key={l.title}>
            <GatsbyLink
              sx={{
                display: 'block',
                variant: 'nav.link',
              }}
              to={l.url}
            >
              {l.title}
            </GatsbyLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
