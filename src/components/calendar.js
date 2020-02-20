import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import FadeIn from 'react-fade-in'
// import './main.scss'

class Calendar extends Component{
    constructor(props){
        super(props)
        this.state = {
            events:[{ title: 'event 1', date: '2020-02-13' },
            { title: 'Tay chay concert', date: '2020-02-20' },
            { title: 'Tay chay concert', date: '2020-02-20' },],
            currentDay: '',
        }
        this.handleDateClick = this.handleDateClick.bind(this)
    }
    calendarComponentRef = React.createRef()

    handleDateClick = (arg) => { // bind with an arrow function
        //alert(arg.dateStr)
        let currentDay = arg.dateStr
        let calendarApi = this.calendarComponentRef.current.getApi()
        this.setState({currentDay})
        calendarApi.gotoDate(currentDay) // call a method on the Calendar object
        console.log(this.state.currentDay)
      }

    render(){
        return(
            <div id="calendar-container">
                <FadeIn>
                    <div id="main-calendar-holder">                        
                        <div id="day-calendar" className="calendars">
                            <FullCalendar 
                            ref={ this.calendarComponentRef }
                            defaultView="timeGridDay"
                            plugins={[timeGridPlugin]}
                            header={{
                                left: '',
                                center: 'title',
                                right: ''
                            }}
                            weekends={false}
                            events={this.state.events}
                            goToDate={this.state.currentDay}      
                            />
                        </div>
                        <div id="month-calendar" className="calendars">
                            <FullCalendar 
                            selectable={true}
                            dateClick={this.handleDateClick}
                            defaultView="dayGridMonth"
                            plugins={[dayGridPlugin,interactionPlugin]}
                              header={{
                                left: '',
                                center: 'title',
                                right: ''
                            }}
                            weekends={false}
                            events={this.state.events}
                            />
                        </div>
                    </div>       
                </FadeIn>
            </div>
            
        )
    }
}

export default Calendar