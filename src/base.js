import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
    render(){
        return(
            <nav>
                <div class="nav-container">
                    <div class="nav-logo">
                        <li><NavLink exact to={'/'} activeClassName="active"> Home </NavLink></li>
                    </div>
                    <ul class="nav-links">
                        <li><NavLink to={'/n'} activeClassName="active"> Noe annet </NavLink></li>
                        <li><NavLink to={'/voting'} activeClassName="active">Voting</NavLink></li>
                        <li><NavLink to={'/index'} activeClassName="active">Scoreboard</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;