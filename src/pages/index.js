import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/Post"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1 className="container my-4">Latest posts...</h1>
    <StaticQuery query={indexQuery} render={data => {
      return (
        <div className="container">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Post 
              key={node.id}
              title={node.frontmatter.title} 
              author={node.frontmatter.author}
              path={node.frontmatter.path}
              date={node.frontmatter.date}
              body={node.excerpt}
              tags={node.frontmatter.tags}
            />
          ))}
        </div>
      )
    }}/>
  </Layout>
)

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            path
            tags
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
