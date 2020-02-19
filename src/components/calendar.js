import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
// import './main.scss'

class Calendar extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
        )
    }
}

export default Calendar