import { useStaticQuery, graphql } from 'gatsby'

export function useSiteMetadata(): Site {
  return useStaticQuery(graphql`
    query SiteQuery {
      site {
        ...NavigationData
        ...FooterData
      }
    }
  `)
}
