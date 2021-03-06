import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PostCard from '../components/PostCard'

import { Container } from 'react-bootstrap'

const tagPosts = ({ data, pageContext }) => {
  // const { tag } = pageContext
  // const { totalCount } = data.allMarkdownRemark
  // const pageHeader = `${totalCount} post${
  //   totalCount === 1 ? '' : 's'
  // } tagged with "${tag}"`

  return (
    <Layout>
      <Container className="mt-4">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <PostCard
            key={node.id}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            subtitle={node.frontmatter.subtitle}
            author={node.frontmatter.author}
            date={node.frontmatter.date}
            body={node.excerpt}
            tags={node.frontmatter.tags}
          />
        ))}
      </Container>
    </Layout>
  )
}

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            date(formatString: "MMMM Do YYYY")
            author
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default tagPosts
