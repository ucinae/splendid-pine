import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import "../styles/index.scss"

const Header = ({ siteTitle }) => {
  return (
  <header>
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <Link className="navbar-brand" to="/">
        <div className="navbar-item">{siteTitle}</div>
      </Link>

      <div id="blogCategory" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/about">
            About
          </Link>
          <Link className="navbar-item" to="/stack">
            Stack
          </Link>
          <Link className="navbar-item" to="/blog">
            Blog
          </Link>
          <Link className="navbar-item" to="/book">
            Book
          </Link>
        </div>
      </div>
    </nav>
  </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
