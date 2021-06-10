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
      <div
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          mx: 3,
        }}
      >
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
        <button
          onClick={() => setColorMode((c) => (c == 'light' ? 'dark' : 'light'))}
          sx={{
            border: 0,
            backgroundColor: 'transparent',
            fontSize: 3,
            p: 2,
            m: 0,
            boxSizing: 'border-box',
            outline: 'none',
            variant: 'links.navigation',
          }}
        >
          {colorMode == 'light' ? <FiSun /> : <FiMoon />}
        </button>
      </div>
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
