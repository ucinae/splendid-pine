import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout';
import SEO from '../components/seo';

import { Container } from 'react-bootstrap'

// TODO 타임라인 스크롤 좀 잘 구현하기 아직도 about page가 부족하다.
const AboutPage = (props) => {
  return (
    <Layout>
      <SEO title="About" keywords={[`gatsby`, `application`, `react`]} />
      <div className="about">
        {/* 윗 사진 영역 */}
        <div className="banner">
          <Img className="banner-img" fluid={props.data.imageBanner.childImageSharp.fluid} />
          <h1 className="about-title">About</h1>
        </div>


        <Container className="mt-5 introduce">

          <h1>About</h1>
          <h3>장한솔</h3>
          <p>아직 학생이므로 관심 가는 분야 닥치는대로 공부해나가는 예비 개발자</p>
          <h5>특이사항</h5>
          <p>백준 온라인 저지 700 문제 해결</p>
          <p>한 달에 독서 2권 이상. 관심 분야: 과학, 사회, 경제경영</p>
          <p>20살 부터 하루도 빠짐없이 일기 작성 중</p>


          <section className="timeline">
            <ol>
              <li>
                <div>
                  <time>2018.07</time>
                  본격적인 개발 공부 시작 Java를 이용한 안드로이드 개발
                </div>
              </li>
              <li>
                <div>
                  <time>2018.08</time>
                  머신러닝, 딥러닝에 흥미가 생겨 파이썬과 scikit-learn, tensorflow 공부
                </div>
              </li>
              <li>
                <div>
                  <time>2018.09</time>
                  안드로이드 계속 공부 중에 Kotlin이라는 언어를 알게되고 Kotlin으로 안드로이드 개발 시작
                </div>
              </li>
              <li>
                <div>
                  <time>2018.11</time>
                  programmers에서 주최한 winter coding 지원. 떨어지고 곧바로 Flutter 공부 시작
                </div>
              </li>
              <li>
                <div>
                  <time>2018.12</time>
                  Web 공부 시작 Javascript 부터 차근차근 동시에 Node.js도 같이 공부
                </div>
              </li>
              <li>
                <div>
                  <time>2019.01</time>
                  Vue 공부 시작 Vue를 비롯한 Vuex, Vuetify 등등을 함께 배움
                </div>
              </li>
              <li>
                <div>
                  <time>2019.02</time>
                  React 공부 시작
                </div>
              </li>
              <li>
                <div>
                  <time>2019.03</time>
                  GraphQL을 공부한 뒤 Gatsby를 활용해 React 블로그 개발 시작!!!
                </div>
              </li>
              <li>
                <div>
                  <time>2019.04</time>
                  CSS, SASS 등의 디자인과 MobX, Redux 등의 React 심화 공부 중~
                </div>
              </li>
              <li></li>
            </ol>
          </section>

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
