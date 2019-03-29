import React from 'react'
import Layout from '../components/layout';
import SEO from '../components/seo';

import { Container, Jumbotron } from 'react-bootstrap'

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />

      <Jumbotron>
          <h1>About</h1>
        </Jumbotron>
      <Container className="mt-5 introduce">
        
        <h3>장한솔</h3>
        <p>재밌어 보이는 분야는 일단 공부하고 보는 예비 개발자</p>

        
      </Container>
    </Layout>
  )
}

export default AboutPage
