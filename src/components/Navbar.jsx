import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink activeClassName="active" className="navbar-brand" to="/" end>
          FastCals
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/about">
                  &nbsp;About
                </NavLink>
              </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
