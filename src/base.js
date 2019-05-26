import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const active = {
  fontWeight: "bold",
  color: "#b8b8b8"
}; 
const title = {
    displayInline: "block", 
    verticalAlign:"top", 
    margin:"0%"
}
class Navbar extends Component {
  render() {
    return (
      <nav class="blue-grey">
        <div class="nav-wrapper">
          <div class="brand-logo center">
            <NavLink exact to={"/"} activeClassName="active">
              <h1 style={title}>Theodor René Carlsen</h1>
            </NavLink>
          </div>
          <ul class="right hide-on-med-and-down">
            <li>
              <NavLink to={"/curr"} activeStyle={active}>
                {" "}
                Noe annet{" "}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/edit"} activeStyle={active}>
                Voting
              </NavLink>
            </li>
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
