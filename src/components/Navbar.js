import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby';

import "../styles/index.scss"

const NavbarItem = props => (
  <Link to="/" className="navbar-item is-capitalized">
    {props.page}
  </Link>
)

const NavbarBurger = props => (
  <button
    onClick={props.toggleMenu}
    className={`button navbar-burger is-primary ${props.active ? 'is-active' : ''}`}
  >
    <span />
    <span />
    <span />
  </button>
)

class Navbar extends React.Component {
  state = {
    activeMenu: false,
  }
  toggleMenu = () => {
    this.setState({
      activeMenu: !this.state.activeMenu,
    })
  }
  render() {
    let { pages = [] } = this.props;
    let navbarItems = pages.map(page => <NavbarItem page={page} key={page} />)
    return (
      <nav className={`navbar is-fixed-top is-primary`}>
        <div className="navbar-brand">
          <NavbarItem page={this.props.siteTitle} />
          <NavbarBurger
            active={this.state.activeMenu}
            toggleMenu={this.toggleMenu}
          />
        </div>
        <div className={`navbar-menu ${this.state.activeMenu ? 'is-active' : ''}`}>
          <div className="navbar-start">{navbarItems}</div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  pages: PropTypes.array.isRequired,
  color: PropTypes.string,
}

export default Navbar