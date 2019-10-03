import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { list } from './apiTeams'
import {list as listp} from '../people/apiPeople'
import Spinner from '../components/spinner'
import config from '../../config'
import CustomizedTable from '../components/muiteamtable'
import { amelsContains } from '../people/releveantPersons'

class Teams extends Component {
  state = {
    teams: [],
    loading: false,
    people:[]
  }
  ref = () => {
    this.componentDidMount();
  };

  
  componentDidMount() {
    if (config.currentUser.role == "Admin" || config.currentUser.role == "Guest") {
      this.setState({ loading: true })
      setTimeout(() => {
        list().then((data) => {
          this.setState({ teams: data })
          this.setState({ loading: false })
          
        })
        listp().then((data)=>{

          this.setState({people:data})
        })
      }, config.timeOut)
     
    } else {
      list().then((data) => {
        let relevantTeams = [];
        for (let i = 0; i < data.length; i++) {
          if (amelsContains(localStorage.getItem("currentEmployee"), data[i].members)) {
            relevantTeams.push(data[i])
          }
        }
        this.setState({ teams: relevantTeams })
        this.setState({ loading: false })
      })
    }

  }

  render()
   {
    if (this.state.loading)
      return <Spinner />
    else return (
      <div className="tablediv">
        <CustomizedTable teams={this.state.teams} people={this.state.people} refresh={this.ref} ></CustomizedTable>
      </div>
    )
  }
}

export default Teams


