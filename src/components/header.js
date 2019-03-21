import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav } from "react-bootstrap"

const Header = ({ siteTitle }) => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>
          {siteTitle}
        </Navbar.Brand>
      </Link>
      <Nav className="mr-auto">
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/post">Post</Nav.Link>
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
