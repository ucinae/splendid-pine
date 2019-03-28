import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import SpringTest from '../labs/Spring'

const IndexPage = () => {
  return (
    <Layout pageTitle="공부하는 블로그">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <SpringTest/>
    </Layout>
  )
}

export default IndexPage
