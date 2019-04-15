import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

// TODO 솔스타그램 완성 시키기
const solstagram = () => {
  return (
    <Layout>
      <SEO title="Solstagarm" keywords={[`gatsby`, `application`, `react`]} />

      <div className="solstagram-main">
        <div className="solstagram-profile">
          <div className="profile-image">
            <img src="https://via.placeholder.com/150" alt="" />
          </div>

          <section>
            <div className="profile-content">
              <h1 className="profile-name">Hansol</h1>
              <span className="profile-certificate">
                <i className="fas fa-certificate" />
              </span>
              <button className="profile-follow">팔로우</button>
              <span>
                <i className="fas fa-ellipsis-h" />
              </span>
            </div>
            <ul>
              <li>
                <span>게시물</span>
                <span>7</span>
              </li>
              <li>
                <span>팔로워</span>
                <span>7</span>
              </li>
              <li>
                <span>팔로잉</span>
                <span>7</span>
              </li>
            </ul>

            <div>상태글</div>
          </section>
        </div>

        <div className="solstagram-gallery">
          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>

          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>

          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>

          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>

          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>

          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>

          <div className="gallery-item">
            <img src="https://via.placeholder.com/250" alt="" />
            <div className="gallery-item-info">2019.04.15</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default solstagram
