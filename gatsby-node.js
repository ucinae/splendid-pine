const { slugify } = require('./src/utils/utilityFunctions');
const path = require('path')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: 'slug',
      value: slugFromTitle
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const templates = {
    singlePost: path.resolve('src/templates/single-post.js'),
    tagsPage: path.resolve('src/templates/tags-page.js'),
    tagPosts: path.resolve('src/templates/tag-posts.js'),
  }

  return graphql(`
    {
      allMarkdownRemark{
        edges{
          node{
            frontmatter{
              author
              tags
            }
            fields{
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)

    const posts = res.data.allMarkdownRemark.edges

    // Create single blog post pages
    posts.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: {
          // Passing slug for template to use to get post
          slug: node.fields.slug
        }
      })
    })

    // Get all tags
    let tags = []
    _.each(posts, edge => {
      if(_.get(edge, 'node.frontmatter.tags')){
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    let tagPostCounts = {}
    tags.forEach(tag => {
      tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
    })

    tags = _.uniq(tags)

    // Create tags page
    createPage({
      path: `/tags`,
      component: templates.tagsPage,
      context: {
        tags,
        tagPostCounts
      }
    })

    // Create tag posts pages
    tags.forEach(tag => {
      createPage({
        path: `/tags/${slugify(tag)}`,
        component: templates.tagPosts,
        context: {
          tag,
        }
      })
    })
  })
}