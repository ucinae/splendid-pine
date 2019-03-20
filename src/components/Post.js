import React from 'react'
import { Link } from 'gatsby'

import '../styles/index.scss'

// 블로그 포스트 하나의 컴포넌트
// TODO 포스트 카드 사이의 Margin을 좀 두어야함 
const Post = ({ title, author, path, date, body }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">{title}</div>
      </div>

      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <div className="content">
              {body}
            </div>
            <div className="level">
              <div className="level-left"></div>
              <div className="level-right">
                <div className="level-item">
                  <span>{date} </span>
                  <span>by {author}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to={path}>
          <div className="button is-primary">
            Read more
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Post