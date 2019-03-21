import React from 'react'
import { Link, graphql } from 'gatsby'
import { Badge } from 'react-bootstrap'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { slugify } from '../utils/utilityFunctions'

const SinglePost = ({ data }) => {
  const post = data.markdownRemark.frontmatter
  return (
    <Layout>
      <SEO title={post.title} />
      <h1>{post.title}</h1>
      <h2>{post.author}</h2>
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
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!){
    markdownRemark(fields: { slug: { eq: $slug }}){
      id
      html
      frontmatter{
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
      }
    }
  }
`

export default SinglePost
