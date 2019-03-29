import React from "react"

const Footer = () => {
  return (
    <div className="site-footer">
      <h4 className="text-center">Splendid Pine</h4>
      <p className="text-center">Design by Bootstrap</p>
      <div className="footer-social-links">
        <ul className="social-links-list">
          <li>
            <a
              href="https://github.com/solft"
              target="_black"
              rel="noopener noreferrer"
              className="github"
            >
              <i className="fab fa-github fa-2x" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
