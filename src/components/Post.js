import React from 'react'
import { Link } from 'gatsby'

import { Card, Button } from 'react-bootstrap'

// 블로그 포스트 하나의 컴포넌트
const Post = ({ title, author, path, date, body }) => {
  return (
    <Card className="my-2">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <Card.Text className="text-right">
          <span className="text-info">{date}</span> by{' '}
          <span className="text-info">{author}</span>
        </Card.Text>
        <Link to={path}>
          <Button>Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Post