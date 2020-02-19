import React from 'react'
import {Link} from 'react-router-dom'

import calendarImage from '../assets/home/calendar.png'
import chatImage from '../assets/home/social_2.png'
import formImage from '../assets/home/forms.png'
import gameImage from '../assets/home/games.png'
import employeeImage from '../assets/home/employees.png'

let Home = () =>{
    return(
        <div id="main-home-container">
            <Link className="home-links" to="/social">
                <img className="home-icons" src={calendarImage}></img>
            </Link>       
            <Link className="home-links" to="/social">
                <img className="home-icons" src={chatImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={formImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={gameImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={employeeImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={chatImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={employeeImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={formImage}></img>
            </Link>
            <Link className="home-links" to="/social">
                <img className="home-icons" src={gameImage}></img>
            </Link>
        </div>
    )
}

export default Home