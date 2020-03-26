import React from 'react'
import {Link} from 'react-router-dom'

import calendarImage from '../assets/home/calendar.png'
import chatImage from '../assets/home/social_2.png'
import formImage from '../assets/home/forms.png'
import gameImage from '../assets/home/games.png'
import employeeImage from '../assets/home/employees.png'
import FadeIn from 'react-fade-in'

console.log(process.env.ACCESS_TOKEN)

let Home = () =>{
    var myStyle={
        textAlign:'center',
        
    }
    return(
        <FadeIn>
        <div id="main-home-container">
            <Link className="home-links" to="/calendar">
                <img className="home-icons" src={calendarImage}></img>
                <p style={myStyle}>calendar</p>
            </Link>       
            <Link className="home-links" to="/social">
                <img className="home-icons" src={chatImage}></img>
                <p style={myStyle}>Social</p>
            </Link>
            
            <Link className="home-links" to="/forms">
                <img className="home-icons" src={formImage}></img>
                <p style={myStyle}>Forms</p>
            </Link>
            <Link className="home-links" to="/games">
                <img className="home-icons" src={gameImage}></img>
                <p style={myStyle}>Games</p>
            </Link>
            <Link className="home-links" to="/employees">
                <img className="home-icons" src={employeeImage}></img>
                <p style={myStyle}>Employees</p>
            </Link>
      
        </div>
        </FadeIn>
    )
}

export default Home