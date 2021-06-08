/* eslint-disable */
const path = require('path')

function extendSchema({ actions }) {
  const { createTypes } = actions
  const typeDefs = `
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      title: String
      date: String
      draft: Boolean
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
                draft
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
    let { frontmatter: { date, title, draft } } = node

    let datePath = createPathFromDate(date)
    if (datePath == 'Invalid Date') {
      reporter.panicOnBuild(`🚨  ERROR: Invalid date format for post with id ${node.id}`)
    }
    let titlePath = convertTitleToSlug(title)

    let slug = path.join(PATH_ROOT, datePath, titlePath)

    if (process.env.NODE_ENV == "development" || !draft) {
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

exports.createPages = createPages
exports.createSchemaCustomization = extendSchema
