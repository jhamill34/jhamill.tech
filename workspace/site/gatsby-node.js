/* eslint-disable */
const path = require('path')
const lunr = require('lunr')
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const { createMdxAstCompiler } = require('@mdx-js/mdx')
const matter = require('gray-matter')

function indexBuilderFactory(documents) {
  return function buildIndex() {
    this.ref('id')
    this.field('title')
    this.field('date')
    this.field('body')

    documents.forEach((d) => {
      this.add(d)
    })
  }
}

function visitMdxNode(node, buffer) {
  if (node.type === undefined) {
    return
  }

  if (node.type === 'text' && node.value !== undefined) {
    buffer.push(node.value)
  }
}

function traverseMdxAst(root) {
  let stack = [root]
  let buffer = []

  while (stack.length > 0) {
    let node = stack.pop()

    visitMdxNode(node, buffer)

    if (node.children !== undefined) {
      for (let child of node.children.reverse()) {
        stack.push(child)
      }
    }
  }

  return buffer.join('\n\n')
}

function createNewResolvers({ createResolvers }) {
  const resolvers = {
    MdxConnection: {
      lunrIndex: {
        type: 'JSON',
        resolve: (source) => {
          let compiler = createMdxAstCompiler({ remarkPlugins: [] })
          let documents = source.nodes 
              .map(({ id, frontmatter: { title, date }, rawBody }) => ({
                id,
                title,
                date,
                body: traverseMdxAst(compiler.parse(matter(rawBody).content))
              }))

          let idx = lunr(indexBuilderFactory(documents))
          return JSON.stringify(idx)
        }
      }
    }
  }

  createResolvers(resolvers)
}

async function createRemoteEmbeddedImagesNode({ node, createNodeId, actions: { createNode }, cache, store }) {
  if (node.frontmatter === undefined || node.frontmatter.embeddedImagesRemote === undefined) {
    return
  }

  return Promise.all(node.frontmatter.embeddedImagesRemote.map(({ image }) => {
    try {
      return createRemoteFileNode({
        url: image,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        cache,
        store
      })
    } catch (error) {
      console.error(error);
    }
  }))
}

function addSlugToNode({ node, actions: { createNodeField } }) {
  if (node.frontmatter === undefined || node.frontmatter.title === undefined) {
    return 
  }
  
  const PATH_ROOT = 'blog'
  const titlePath = convertTitleToSlug(node.frontmatter.title)
  const slug = path.join(PATH_ROOT, titlePath)

  createNodeField({
    node,
    name: 'slug',
    value: slug,
  })
}

async function onCreateNode(args) {
  const { node } = args
  switch(node.internal.type) {
    case 'Mdx': 
      await createRemoteEmbeddedImagesNode(args)
      addSlugToNode(args)
  }
};

function extendSchema({ actions }) {
  const { createTypes } = actions
  const typeDefs = `
    type Site implements Node {
      siteMetadata: SiteSiteMetadata
    }

    type SiteSiteMetadata {
      shortTitle: String
      title: String
      description: String
      author: String
      navigationLinks: [Link]
      socialLinks: SocialLinks
    }

    type Link {
      title: String
      url: String
    }

    type SocialLinks {
      github: String
      linkedin: String
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }

    type MdxFields {
      slug: String
    }

    type MdxFrontmatter {
      title: String
      date: String
      publish: Boolean
      embeddedImagesLocal: [LocalFileWithName]
      embeddedImagesRemote: [RemoteFileWithName] 
    }

    interface FileWithName {
      key: String
      image: File 
    }

    type LocalFileWithName implements FileWithName {
      key: String
      image: File @fileByRelativePath
    }
    
    type RemoteFileWithName implements FileWithName {
      key: String
      image: File @link(by: "url")
    }
  `
  createTypes(typeDefs)
}

async function createPages({ graphql, actions, reporter }) {
  const { createPage } = actions

  const result = await graphql(
    `
      query {
        allMdx {
          edges {
            node {
              id
              frontmatter { publish }
              fields { slug }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const posts = result.data.allMdx.edges

  posts.forEach(({ node }) => {
    let { frontmatter: { publish }, fields: { slug } } = node

    if (process.env.NODE_ENV == "development" || publish) {
      createPage({
        path: slug,
        component: require.resolve(`./src/templates/postTemplate.tsx`),
        context: { id: node.id },
      })
    }
  })
}

function convertTitleToSlug(titleString) {
  return titleString.split(/\s+/)
    .map(word => word.toLowerCase())
    .reduce((result, next) => {
      if (result.length == 0) {
        return next
      } 

      return `${result}-${next}`
    })
}


function onCreateWebpack({ actions }) {
  actions.setWebpackConfig({
    experiments: {
      syncWebAssembly: true,
      asyncWebAssembly: true,
    }
  })
}

exports.onCreateNode = onCreateNode
exports.createPages = createPages
exports.createSchemaCustomization = extendSchema
exports.onCreateWebpackConfig = onCreateWebpack
exports.createResolvers = createNewResolvers
