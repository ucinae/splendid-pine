import React from 'react'
import { Link, graphql } from 'gatsby'
import { Badge } from 'react-bootstrap'
import { DiscussionEmbed} from 'disqus-react'

import SEO from '../components/seo'
import Layout from '../components/layout'
import { slugify } from '../utils/utilityFunctions'

import { Container } from 'react-bootstrap'

const SinglePost = ({ data, pageContext }) => {
  const post = data.markdownRemark.frontmatter

  const baseUrl = 'https://splendid-pine.netlify.com/'
  const disqusShrotname = "https-splendid-pine-netlify-com"
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug
  }
  return (
    <Layout>
      <SEO title={post.title} />
      <Container className="markdown-body mt-5">
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        <div>
          <div className="post-tags mr-1 mt-3 mb-5">
            Tags - 
          </div>
          {post.tags.map(tag => (
            <div className="post-tags mr-2" key={tag}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge variant="primary" pill>{tag}</Badge>
              </Link>
            </div>
          ))}
        </div>
        <DiscussionEmbed shortname={disqusShrotname} config={disqusConfig} />
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
