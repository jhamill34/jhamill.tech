/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { Navigation } from './Navigation'

type LayoutProps = {
  children: React.ReactNode
}

export function Layout(props: LayoutProps): React.ReactElement {
  const {
    site: { siteMetadata },
  } = useSiteMetadata()

  return (
    <div>
      <Navigation
        links={siteMetadata.navigationLinks}
        title={siteMetadata.shortTitle}
      />

      <main
        sx={{
          maxWidth: 900,
          minHeight: '100vh',
          margin: '0 auto',
          padding: 3,
        }}
      >
        {props.children}
      </main>
    </div>
  )
}
