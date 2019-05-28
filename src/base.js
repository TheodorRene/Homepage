import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
        </div>
      </nav>
    );
  }
}
//          <ul class="right hide-on-med-and-down">
//           <li>
//             <NavLink to={"/admin"} activeStyle={active}>
//               admin
//             </NavLink>
//           </li>


export default Navbar;
