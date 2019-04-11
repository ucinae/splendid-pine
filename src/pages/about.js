import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout';
import SEO from '../components/seo';

import { Container } from 'react-bootstrap'

// TODO CSS 공부 좀 해서 잘 꾸미기 내가 원하는 스타일대로 맞춰지질 않는다.
const AboutPage = (props) => {
  return (
    <Layout>
      <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
      <div className="about">
      
        <div className="banner">
          <Img className="banner-img" fluid={props.data.imageBanner.childImageSharp.fluid} />
          <h1 className="about-title">About</h1>
        </div>
        <Container className="mt-5 introduce">
          
          <h3>장한솔</h3>
          <p>재밌어 보이는 분야는 일단 공부하고 보는 예비 개발자</p>

          <h5>사용 언어</h5>
          <ul>
            <li>C/C++</li>
            <li>Java</li>
            <li>Kotlin</li>
            <li>Python</li>
            <li>HTML</li>
            <li>CSS/SASS</li>
            <li>Javascript</li>
            <li>Dart</li>
          </ul>

          
        </Container>
      </div>
    </Layout>
  )
}

export const aboutQuery = graphql`
  query {
    imageBanner: file(relativePath: { eq: "code-coding-computer.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2160) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`


export default AboutPage
