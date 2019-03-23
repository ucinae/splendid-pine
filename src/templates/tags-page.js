import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Button, Badge } from 'react-bootstrap'
import { slugify } from '../utils/utilityFunctions'

const tagsPage = ({ pageContext }) => {
  const { tags, tagPostCounts } = pageContext
  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={['tags', 'topics']} />
      <ul>
        {
          tags.map(tag => (
            <li key={tag} style={{ marginBottom: '10px' }}>
              <Button href={`/tags/${slugify(tag)}`}>
                {tag} <Badge>{tagPostCounts[tag]}</Badge>
              </Button>
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export default tagsPage