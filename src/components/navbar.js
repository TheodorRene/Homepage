import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/index.css'

const active = {
    fontWeight: 'bold',
    color: '#b8b8b8',
}
class Navbar extends Component {
    render() {
        return (
            <nav className="blue-grey">
                <div className="nav-wrapper">
                    <div className="brand-logo center">
                        <NavLink exact to={'/'} activeClassName="active">
                            <h1 className="nav_title">Theodor René Carlsen</h1>
                        </NavLink>
                    </div>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <NavLink to={'/admin'} activeStyle={active}>
                                admin
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="left">
                        <li>
                            <a href='https://www.linkedin.com/in/theodorcarlsen/'> LinkedIn </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const logo = {
    maxWidth: "100%",
    mexHeight: "100%"
}

export default Navbar
