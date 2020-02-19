import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FadeIn from 'react-fade-in'
// import './main.scss'

class Calendar extends Component{
    constructor(props){
        super(props)
        this.state = {}
        this.handleDateClick = this.handleDateClick.bind(this)
    }

    handleDateClick = (arg) => { // bind with an arrow function
        alert(arg.dateStr)
      }

    render(){
        return(
            <div id="calendar-container">
                <FadeIn>
                    <FullCalendar 
                    dateClick={this.handleDateClick}
                    // defaultView="dayGridMonth"
                    plugins={[dayGridPlugin,interactionPlugin ]}
                    weekends={false}
                    events={[
                      { title: 'event 1', date: '2020-02-13' },
                      { title: 'Tay chay concert', date: '2020-02-20' }
                    ]}
                    />
                </FadeIn>
                
            </div>
            
        )
    }
}

export default Calendar