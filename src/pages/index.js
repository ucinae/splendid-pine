import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'

import Layout from '../components/layout'
import SEO from '../components/seo'
import MainImage from '../images/coding.jpg'

const IndexPage = () => {
  return (
    <Layout pageTitle="공부하는 블로그">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
       {/* TODO 인덱스 페이지에 다른 사이트 인덱스처럼 멋지게 만들기 + 솔스타그램 만들기  */}
      <Container>
        <Image src={MainImage} fluid></Image>
      </Container>
      <Container>
        <Row>
          <Col>
            <div className="text-center">
              <i className="fas fa-code fa-10x"></i>
              <h2>WEB</h2>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <i className="fas fa-mobile-alt fa-10x" />
              <h2>MOBILE</h2>
            </div>
          </Col>
          <Col>
            <div className="text-center">
            <i className="fas fa-brain fa-10x"></i>
              <h2>ML</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
