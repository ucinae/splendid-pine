import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Container } from 'react-bootstrap'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div className="banner" />
    </Layout>
  )
}

export default IndexPage
