import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostCard from '../components/PostCard'
import PaginationLinks from '../components/PaginationLinks'

import { Container } from 'react-bootstrap'

const postList = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = props.pageContext

  return (
    <Layout>
      <Container className="mt-4">
        {posts.map(({ node }) => (
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
        <PaginationLinks currentPage={currentPage} numberOfPages={numberOfPages} />
      </Container>
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($skip: Int!, $limit: Int!){
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
          fields{
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default postList