import React from 'react'
import { Link } from 'gatsby'

import { Card, Badge } from 'react-bootstrap'

import { slugify } from '../utils/utilityFunctions'

// 블로그 포스트 하나의 컴포넌트
const Post = ({ title, subtitle, author, slug, date, body, tags }) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Link to={`/${slug}`} className="text-body">
          <Card.Title><h1>{title}</h1></Card.Title>
          <Card.Subtitle>{subtitle}</Card.Subtitle>
        </Link>
        <ul className="post-tags mt-4">
          {tags.map(tag => (
            <li key={tag}>
              <Link to={`/tag/${slugify(tag)}`}>
                <Badge pill variant="primary" className="text-uppercase">
                  {tag}
                </Badge>
              </Link>
            </li>
          ))}
        </ul>
        <Card.Text className="text-right">
          <span className="text-info">{date}</span> by{' '}
          <span className="text-info">{author}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Post
