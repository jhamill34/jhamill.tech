declare module 'prismjs/components/*'

type Data<T> = {
  data: T
}

type SocialLinks = {
  github: string
  linkedin: string
  twitter: string
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
  socialLinks: SocialLinks
}

type TableOfContentsLink = Link & {
  items: [TableOfContentsLink]
}

type ImageWithKey = {
  key: string
  image: ImageDataLike
}
