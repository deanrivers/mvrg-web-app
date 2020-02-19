import React from 'react'
import { NavLink } from 'react-router-dom';
import Logo from '../assets/MVRG_Logo.png'

let Nav = () =>{
    return(
        <div id="main-nav-container">
            <div id="logo-container">
                <img className="logo" src={Logo}/>
            </div>
            <div id="navbar-container">
                <ul id="navbar-list">
                    <li><NavLink activeClassName="activeRoute" className="Nav_Link" to="/home" >Home</NavLink></li>
                    <li><NavLink activeClassName="activeRoute" className="Nav_Link" to="/employees" >Employees</NavLink></li>
                    <li><NavLink activeClassName="activeRoute" className="Nav_Link" to="/calendar" >Calendar</NavLink></li>                        
                    <li><NavLink activeClassName="activeRoute" className="Nav_Link" to="/social" >Social</NavLink></li>                        
                    <li><NavLink activeClassName="activeRoute" className="Nav_Link" to="/forms" >Forms</NavLink></li>                        
                    <li><NavLink activeClassName="activeRoute" className="Nav_Link" to="/games" >Games</NavLink></li>                        
                </ul>
            </div>

        </div>

    )
}

export default Nav