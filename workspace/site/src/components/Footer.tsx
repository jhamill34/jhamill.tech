/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

type FooterProps = {
  links: SocialLinks
}

function FooterItem(props: {
  to: string
  children: React.ReactNode
}): React.ReactElement {
  return (
    <a
      href={props.to}
      sx={{
        variant: 'links.navigation',
        lineHeight: '1em',
        display: 'block',
        m: 3,
      }}
    >
      {props.children}
    </a>
  )
}

export function Footer(props: FooterProps): React.ReactElement {
  const {
    links: { github, linkedin, twitter },
  } = props

  return (
    <footer>
      <div
        sx={{
          fontSize: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <FooterItem to={github}>
          <FaGithub />
        </FooterItem>
        <FooterItem to={linkedin}>
          <FaLinkedin />
        </FooterItem>
        <FooterItem to={twitter}>
          <FaTwitter />
        </FooterItem>
      </div>
    </footer>
  )
}

export const fragment = graphql`
  fragment FooterData on Site {
    siteMetadata {
      socialLinks {
        github
        linkedin
        twitter
      }
    }
  }
`
