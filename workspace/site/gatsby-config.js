module.exports = {
  siteMetadata: {
    shortTitle: '>_ jhamill.tech()',
    title: `Personal website of Josh Hamill`,
    description: `Find blog posts and portfolio information here`,
    author: `Josh Hamill`,
    navigationLinks: [
      // { title: 'Blog', url: '/blog' },
      // { title: 'Portfolio', url: '/portfolio' },
      // { title: 'Contact', url: '/contact' },
    ],
    socialLinks: {
      github: 'https://github.com/jhamill34',
      linkedin: 'https://www.linkedin.com/in/jlrasmussen34/',
      twitter: 'https://twitter.com/jhamill34',
    },
  },
  plugins: [
    `gatsby-plugin-pnpm`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [require('remark-slug')],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
  ],
}
