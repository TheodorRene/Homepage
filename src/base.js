import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import "./css/index.css";

const active ={
    fontWeight: "bold",
    color: "#b8b8b8"
}
class Navbar extends Component {
  render() {
    return (
      <nav className="blue-grey">
        <div className="nav-wrapper">
          <div className="brand-logo center">
            <NavLink exact to={"/"} activeClassName="active">
              <h1 className="nav_title">Theodor René Carlsen</h1>
            </NavLink>
          </div>
          <ul className="right hide-on-med-and-down">
           <li>
             <NavLink to={"/admin"} activeStyle={active}>
               admin
             </NavLink>
           </li>
       </ul>
        </div>
      </nav>
    );
  }
}


export default Navbar;
