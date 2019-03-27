import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Post from '../components/Post'
import PaginationLinks from '../components/PaginationLinks'

const IndexPage = () => {
  const postsPerPage = 5
  let numberOfPages

  return (
    <Layout pageTitle="Splendid Pine">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
       {/* TODO 인덱스 페이지에 다른 사이트 인덱스처럼 멋지게 만들기 + 솔스타그램 만들기  */}
      <StaticQuery
        query={indexQuery}
        render={data => {
          numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / postsPerPage)
          return (
            <div className="container">
              {data.allMarkdownRemark.edges.map(({ node }) => (
                <Post
                  key={node.id}
                  title={node.frontmatter.title}
                  author={node.frontmatter.author}
                  slug={node.fields.slug}
                  date={node.frontmatter.date}
                  body={node.excerpt}
                  tags={node.frontmatter.tags}
                />
              ))}
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            </div>
          )
        }}
      />
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
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

export default IndexPage
