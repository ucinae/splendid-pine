import React from 'react'
import Layout from '../components/layout';
import SEO from '../components/seo';

import { Container, Row, Col } from 'react-bootstrap'

const solstagram = () => {
  return (
    <Layout>
      <SEO title="Solstagarm" keywords={[`gatsby`, `application`, `react`]} />
      <Container>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default solstagram
