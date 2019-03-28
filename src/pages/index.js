import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Container, Row, Col } from 'react-bootstrap'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div className="banner text-center align-bottom">
          BANNER IMAGE
        </div>
        <Container>
          <Row>
            <Col>
              web
            </Col>
            <Col>
              mobile
            </Col>
            <Col>
              ML
            </Col>
          </Row>
        </Container>
    </Layout>
  )
}

export default IndexPage
