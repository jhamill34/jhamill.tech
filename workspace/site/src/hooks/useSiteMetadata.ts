import { useStaticQuery, graphql } from 'gatsby'

export function useSiteMetadata(): Site {
  return useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          shortTitle
          navigationLinks {
            title
            url
          }
        }
      }
    }
  `)
}
