/** @jsxRuntime classic */
/** @jsx jsx */
import { Link as GatsbyLink, graphql } from 'gatsby'
import { jsx, useColorMode } from 'theme-ui'
import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

type NavigationProps = {
  title: string
  links: [Link]
}

export function Navigation(props: NavigationProps): React.ReactElement {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <nav
      sx={{
        display: 'grid',
        gridTemplateColumns: ['1fr auto', '1fr auto auto'],
        gridTemplateAreas: [
          '"home toggle" "links links"',
          '"home links toggle"',
        ],
        px: 3,
        variant: 'nav.root',
      }}
    >
      <div
        sx={{
          variant: 'nav.left',
          gridArea: 'home',
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
          justifyContent: 'center',
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          variant: 'nav.right',
          gridArea: 'links',
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
      <button
        onClick={() => setColorMode((c) => (c == 'light' ? 'dark' : 'light'))}
        sx={{
          border: 0,
          flexGrow: 0,
          backgroundColor: 'transparent',
          fontSize: 3,
          p: 2,
          m: 0,
          boxSizing: 'border-box',
          outline: 'none',
          variant: 'links.navigation',
          gridArea: 'toggle',
        }}
      >
        {colorMode == 'light' ? <FiSun /> : <FiMoon />}
      </button>
    </nav>
  )
}

export const fragment = graphql`
  fragment NavigationData on Site {
    siteMetadata {
      shortTitle
      navigationLinks {
        title
        url
      }
    }
  }
`
