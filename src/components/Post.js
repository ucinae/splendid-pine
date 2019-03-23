import React from 'react'
import { Link } from 'gatsby'

import { Card, Button, Badge } from 'react-bootstrap'

import { slugify } from '../utils/utilityFunctions'

// 블로그 포스트 하나의 컴포넌트
const Post = ({ title, author, slug, date, body, tags }) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <ul className="post-tags">
          {
            tags.map(tag => (
              <li key={tag}>
                <Link to={`/tags/${slugify(tag)}`}>
                  <Badge pill variant="primary" className="text-uppercase">{tag}</Badge>
                </Link>
              </li>
            ))
          }
        </ul>
        <Card.Text className="text-right">
          <span className="text-info">{date}</span> by{' '}
          <span className="text-info">{author}</span>
        </Card.Text>
        <Link to={slug}>
          <Button>Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Post