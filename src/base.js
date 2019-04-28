import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const active = {
  fontWeight: "bold",
  color: "#b8b8b8"
}; 
class Navbar extends Component {
  render() {
    return (
      <nav class="blue-grey">
        <div class="nav-wrapper">
          <div class="brand-logo center">
            <NavLink exact to={"/"} activeClassName="active">
              {" "}
              Theodor René Carlsen{" "}
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
              <NavLink to={"/index"} activeStyle={active}>
                Scoreboard
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}


export default Navbar;
