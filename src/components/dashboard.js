import React, { Component } from 'react'
import '../assets/styles/dashboard.css'
import { list,read, update } from '../people/apiPeople'
import PieChart from './piechart'
import { list as listp } from '../projects/apiProjects'
import Spinner from '../components/spinner'
import config from '../../config';
import {getOne, post} from '../calendar/apiCalendar';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {numberOfNewComments} from './notifications'


var mongoose = require('mongoose');

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate();
}

function fillDays(){
  let days = [], daysInCurrentMonth;
  daysInCurrentMonth = daysInMonth(new Date().getMonth() + 1,  new Date().getFullYear());
  console.log(daysInCurrentMonth)
  let current = new Date().getMonth();
  let year = new Date().getFullYear();
  
  for(let i = 0; i < daysInCurrentMonth + 1; i++){
    let dan = i + 1;
    let day = {
      type: '',
      hours: '',
      tasks: [{
        projectId: '',
        description: '',
        hours: Number
      },
      {
        projectId: '',
        description: '',
        hours: Number
      }
    ],
      date: new Date(year, current, dan),
      comments: []
    }

    if(i !== 0)days.push(day);
  }
  return days;
}

function createCurrentMonth(){//done
  let newCurrentMonth = {
    employeeId: config.currentEmployee,
    days: [],
    dateOfPost: new Date()
  }
  console.log("UDJEM");
  newCurrentMonth.days = fillDays();
  post(newCurrentMonth).then((data) =>{
    if(data.error){
      console.log("ERROR IN CCM: " + data.error);
    }
    replaceCurrentMonth(data._id);
  })
}


function replaceCurrentMonth(newId){ //done// ispraviti da uzima cE iz localstoragea
  let employee;
  read(config.currentEmployee).then((data) => {
    employee = data;
    employee.currentMonth = newId;
    console.log("emp");
    console.log(employee);
    update(localStorage.getItem("currentEmployee"), employee).then((data2) => {
      if(data2.error){
        console.log("ERROR: " + data2.error)
      }
    })
  })

}



class Dashboard extends Component {
constructor(){
  super();
  this.state = {
    people: [],
    genderData: [],
    jobData: [],
    projects: [],
    loading: false,
    checkCm: false,
    numberOfNotifications: 0,
    datesOfComment: []
  };
  this.checkCurrentMonth = this.checkCurrentMonth.bind(this);
}

  checkCurrentMonth() { //done
    let currentMonthId, currentMonth, realMonth, emploFromLs;
    emploFromLs = localStorage.getItem("currentEmployee");
    emploFromLs = emploFromLs.slice(0,emploFromLs.length);
    realMonth = new Date().getMonth();
    realMonth++;
    read(emploFromLs).then((data) => {
      currentMonthId = data.currentMonth;
      //let dateOfComm = datesOfComments(data);
      // console.log("ID");
      // console.log(currentMonthId);
      if(currentMonthId === '' || currentMonthId === undefined){
        // console.log("Helo");
        createCurrentMonth();
        return;
      } else {
        getOne(currentMonthId).then((data1) => {

          let num = numberOfNewComments(data,data1);//component did update
          this.setState({
          numberOfNotifications : num.length,
          datesOfComment: num 
          })
          this.forceUpdate();

          currentMonth = data1.days[0].date.slice(6, 7);
          let rm = realMonth.toString();
          if(currentMonth !== rm){
            createCurrentMonth();
          }
          
        })
      }
    })
  }


  componentDidMount() {

    // console.log(this.state.checkCm, "CDM");
    if(!this.state.checkCm) { this.checkCurrentMonth(); this.setState({ checkCm: true } ) }
    this.setState({ loading: true })
    
      listp().then((data1) => {
        this.setState({ projects: data1.length})
      })

      list().then(data => {
        let Female = 0;
        let Male = 0;
        data.forEach(element => {
          if (element.gender == 'F')
            Female++;
          else if (element.gender == 'M')
            Male++;
        });
        let UIUX = 0;
        let DEV = 0;
        let QA = 0;
        data.forEach(element => {
          if (element.position == 'UI/UX Designer')
            UIUX++;
          else if (element.position == 'Developer')
            DEV++;
          else if (element.position == 'Quality Assurance')
            QA++;
        });
        const GenderData = [{ name: 'Female', value: Female }, { name: 'Male', value: Male }]
        const JobData = [{ name: 'UI/UX', value: UIUX }, { name: 'Dev', value: DEV }, { name: 'QA', value: QA }]
        this.setState({ people: data, genderData: GenderData, jobData: JobData, loading:false })
      });
    
  }

  render() {
    let data;
    // console.log(this.state.numberOfNotifications);
    if(!this.state.checkCm && !(config.currentUser.role == "Guest")){
      this.checkCurrentMonth();
    }
    if (this.state.loading) {
      data = <Spinner />
    } else {
      data = <div className="tablediv">
        <div className="grp">
          <h2>Dashboard</h2>
          <div className="statchart">
            <div className="employees">
              <h2 id="x">{this.state.people.length}</h2>
            </div>
            <div className="emp">
              Employees
           </div>
          </div>
          <div className="genderchart">
            <PieChart data={this.state.genderData} />
            <div className="legend">
              <div className="malefemale">
                <div className="colorboxm" />
                <div className="legendtext">Male</div>
              </div>
              <div className="malefemale">
                <div className="colorboxf" />
                <div className="legendtext">Female</div>
              </div>

            </div>
          </div>
          <div className="genderchart">
            <PieChart data={this.state.jobData} />
            <div className="legend">
              <div className="jobs">
                <div className="colorboxu" />
                <div className="legendtext">UI/UX</div>
              </div>
              <div className="jobs">
                <div className="colorboxd" />
                <div className="legendtext">Dev</div>
              </div>
              <div className="jobs">
                <div className="colorboxq" />
                <div className="legendtext">QA</div>
              </div>
            </div>
          </div>

          <div className="statchart">
            <div className="employees">
              <h2 id="x">{this.state.projects}</h2>
            </div>
            <div className="emp">
              Ongoing projects
           </div>
          </div>
        </div>
      </div>
    }
    return (
      <div>{data}</div>
    )
  }
}


export default Dashboard;
