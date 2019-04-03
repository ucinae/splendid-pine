import React from 'react'
import { Link, graphql } from 'gatsby'
import { Badge } from 'react-bootstrap'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { slugify } from '../utils/utilityFunctions'

import { Container } from 'react-bootstrap'

const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title={post.title} />
      <Container className="markdown-body mt-5">
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        <ul>
          {post.tags.map(tag => (
            <li key={tag}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge>{tag}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMMM Do YYYY")
        tags
      }
    }
  }
`

export default SinglePost
