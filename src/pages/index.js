import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { Container, Row, Col, Card } from 'react-bootstrap'

const IndexPage = (props) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <Img fluid={props.data.imageBanner.childImageSharp.fluid} />
        <Container>
          <Row className="mt-4">
            <Card className="mx-auto">
              <Card.Body className="text-center">
                <Card.Title>Gatsby + Netlify로 만든 블로그</Card.Title>
                <Card.Text>
                  gatsby-starter-default로 시작해서 유튜브 강의보며<br/>
                  기본틀을 배우며 만든 후 리액트 공부하며<br/>
                  만들어 나가고 있는 개발 블로그
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row className="mt-4">
            <Card className="mx-auto text-center" style={{ width: '90rem'}}>
              <Row>
                <Col>
                  <Card.Body>
                    <i className="fas fa-code fa-5x mt-3"></i>
                    <Card.Title className="mt-5">WEB</Card.Title>
                    <Card.Text>
                      React, Vue, SASS, Javascript, HTML, CSS
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col>
                  <Card.Body>
                    <i className="fas fa-mobile-alt fa-5x mt-3"></i>
                    <Card.Title className="mt-5">MOBILE</Card.Title>
                    <Card.Text>
                      Android, Java, Kotlin, Flutter
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col>
                  <Card.Body>
                    <i className="fas fa-brain fa-5x mt-3"></i>
                    <Card.Title className="mt-5">ML</Card.Title>
                    <Card.Text>
                      Python, Tensorflow, Keras
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Row>
        </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    imageBanner: file(relativePath: { eq: "pine-forest.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2160) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
