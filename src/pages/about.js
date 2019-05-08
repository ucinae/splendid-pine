import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'

import { Container } from 'react-bootstrap'

// TODO 타임라인 스크롤 좀 잘 구현하기 아직도 about page가 부족하다.
const AboutPage = props => {
  return (
    <Layout>
      <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
      <div className="about">
        {/* 윗 사진 영역 */}
        <div className="banner">
          <Img
            className="banner-img"
            fluid={props.data.imageBanner.childImageSharp.fluid}
          />
        </div>

        <Container className="mt-5 introduce">
        <div className="profile-grid">
          {/* Introduce myself */}
          <div className="profile-top p-4">
            <Img
              className="profile-img"
              fluid={props.data.profileImage.childImageSharp.fluid}
            />
            

            <h1 className="mt-4">장한솔</h1>
            <p>Student</p>

            <div className="mb-2">
              <a href="https://splendid-pine.netlify.com/">
                <i className="fas fa-globe fa-2x"></i>
              </a>
              <a href="https://github.com/solft/">
                <i className="fab fa-github fa-2x"></i>
              </a>
            </div>
          </div>

          {/* Skill Set */}
          <div className="profile-skills p-4">
            <h2>Stack</h2>
            <p>Web, Mobile, ML</p>
            <hr />
            <h2>Language</h2>
            <div className="language">
              <div className="mr-4">
                <i className="fas fa-check"></i> C++
              </div>
              <div className="mr-4">
                <i className="fas fa-check"></i> Python
              </div>
              <div className="mr-4">
                <i className="fas fa-check"></i> Javascript
              </div>
              <div className="mr-4">
                <i className="fas fa-check"></i> Kotlin
              </div>
            </div>
          </div>

          {/* Achivevement */}
          <div className="profile-achive p-4">
            <h2>Achivevement</h2>
            <div>
              백준 700+
            </div>
            <div>
              블로그 제작
            </div>
            <div>
              일일커밋 50+
            </div>
          </div>
        </div>
          
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

    profileImage: file(relativePath: { eq: "dog.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default AboutPage
