import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { list, read } from './apiPeople'
import { list as teams } from '../teams/apiTeams'
import Spinner from '../components/spinner'
import config from '../../config'
import CustomizedTable from '../components/muipeopletable'
import {returnRelevantTeamMembers} from './releveantPersons'

class People extends Component {
    state = {
        people: [],
        loading: false 
    }

    ref = () => {
        this.componentDidMount();
    };

    componentDidMount() {
        if(config.currentUser.role == "Admin" || config.currentUser.role == "Guest"){
        this.setState({ loading: true })
        setTimeout(() => {
            list().then((data) => {
                this.setState({
                    people: data,
                    loading: false 
                })
            })
        }, config.timeOut)
        } else {
            teams().then((teamData) => {
                let teamMembers = returnRelevantTeamMembers(localStorage.getItem("currentEmployee"),teamData);
                let relevantPeople = [];
                for(let i = 0;i < teamMembers.length; i++){
                read(teamMembers[i].person).then((data1) => {
                    relevantPeople.push(data1);
                    if(i === teamMembers.length - 1){
                        this.setState({ 
                            people: relevantPeople,
                            loading: false
                        })
                    }
                })
                }
            })
            
        }
    
    }

    render() {
        if(this.state.loading)
        return <Spinner/>
        else return (
          <div className="tablediv">
            <CustomizedTable ppldata={this.state.people} refresh={this.ref} />
          </div>
        )
    }

}

export default People