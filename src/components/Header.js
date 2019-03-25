import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav } from "react-bootstrap"

const Header = ({ siteTitle }) => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" className="header-body">
      <Link to="/">
        <Navbar.Brand>
          {siteTitle}
        </Navbar.Brand>
      </Link>
      <Nav className="mr-auto">
        <Nav.Item>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/post" className="nav-link">
            Post
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/tags" className="nav-link">
            Tags
          </Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
