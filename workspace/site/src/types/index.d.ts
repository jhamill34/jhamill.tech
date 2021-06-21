declare module 'prismjs/components/*'

type Data<T> = {
  data: T
}

type Graph<T> = {
  edges: [GraphNode<T>]
}

type GraphNode<T> = {
  node: T
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

type MdxPostCommon = {
  id: string
  frontmatter: {
    title: string
    date: string
    publish: boolean
  }
  timeToRead: number
}

type MdxPostSummary = MdxPostCommon & {
  excerpt: string
  fields: {
    slug: string
  }
}

type MdxPost = MdxPostCommon & {
  body: string
  frontmatter: {
    embeddedImagesLocal: [ImageWithKey]
    embeddedImagesRemote: [ImageWithKey]
  }
  tableOfContents: {
    items: [TableOfContentsLink]
  }
}
