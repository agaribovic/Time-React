import React, { Component } from 'react'
import '../assets/styles/stil.css'
import '../assets/styles/mediaQuery.css'

class About extends Component {
   render() {
    return (
    <div className = "background-landingpg">
      <div className = "container">
        <h4 className = "team-title">About</h4> 
        <div className = "row">
          <div className = "main-content col-md-6">
            <p>Every employee records data for himself. Certain roles in the application can review and control time
              entries. Also, certain roles can record data on behalf of employee.
              All absences should be approved by certain roles. Presences should obey some rules, implemented in the
              application, but can also be reviewed by human, through the reporting system.
              Working days are Monday-Friday weekly. Saturdays and Sundays are non-working days. Work time is 8
              hours daily. Each and every day should be recorded (including public holidays). Application should
              eventually provide an option for (CEO, COO, HR ...) to record public holiday for the entire company.</p>
          </div>
          <div className = "main-content col-md-6">
            <p>Daily recorded time more than 8 hours is considered as overtime (daily). Limit is 12 hours in total for one
                day. Time recorded on Saturday or Sunday is considered as overtime (weekly). Limit is 5 hours/day (10
                hrs. for weekend). Employee should be warned about missing days, and overtime as well (in case of
                wrong recording).
                Communication with employees should be provided by e-mail, or with Slack’s bots. Both options are to be
                implemented, and will be configurable.</p>  
            </div>
        </div>
      </div>
    </div>
   )
}

}

export default About;
