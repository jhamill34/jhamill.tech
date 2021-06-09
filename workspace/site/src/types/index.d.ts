declare module 'prismjs/components/*'

type Data<T> = {
  data: T
}

type Link = {
  title: string
  url: string
}

type Site = {
  site: {
    siteMetadata: SiteMetadata
  }
}

type SiteMetadata = {
  shortTitle: string
  title: string
  description: string
  author: string
  navigationLinks: [Link]
}
