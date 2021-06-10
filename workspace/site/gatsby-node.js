/* eslint-disable */
const path = require('path')
const { createRemoteFileNode } = require('gatsby-source-filesystem')

function onCreateNode({ node, createNodeId, actions: { createNode }, cache, store }) {
  if (
    node.internal.type === 'Mdx' &&
    node.frontmatter &&
    node.frontmatter.embeddedImagesRemote
  ) {
    return Promise.all(
      node.frontmatter.embeddedImagesRemote.map(({ image }) => {
        try {
          return createRemoteFileNode({
            url: image,
            parentNodeId: node.id,
            createNode,
            createNodeId,
            cache,
            store
          });
        } catch (error) {
          console.error(error);
        }
      })
    );
  }
};

function extendSchema({ actions }) {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
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
              frontmatter {
                title
                date
                publish
              }
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
    const PATH_ROOT = 'blog'
    let { frontmatter: { date, title, publish } } = node

    let datePath = createPathFromDate(date)
    if (datePath == 'Invalid Date') {
      reporter.panicOnBuild(`🚨  ERROR: Invalid date format for post with id ${node.id}`)
    }
    let titlePath = convertTitleToSlug(title)

    let slug = path.join(PATH_ROOT, datePath, titlePath)

    if (process.env.NODE_ENV == "development" || publish) {
      createPage({
        path: slug,
        component: require.resolve(`./src/templates/postTemplate.tsx`),
        context: { id: node.id },
      })
    }
  })
}

function createPathFromDate(dateString) {
  let d = new Date(dateString)

  let year = `${d.getFullYear()}`
  let month = d.getMonth() < 9 ? `0${d.getMonth() + 1}` : `${d.getMonth() + 1}` 
  let date = d.getDate() < 10 ? `0${d.getDate()}` : `${d.getDate()}` 

  return path.join(year, month, date)
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

exports.onCreateNode = onCreateNode
exports.createPages = createPages
exports.createSchemaCustomization = extendSchema
