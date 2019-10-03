import React, { Component } from 'react';
import { post } from './apiTeams';
import { Link } from "react-router-dom";
import {list} from '../people/apiPeople'
import '../assets/styles/teamprofile.css';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

class OneTeam extends Component {
    constructor({ match }) {
        super()
        this.state = {
            teamName: '',
            description: '',
            redirectToProfile:'',
            employees: [],
            members: [] 
        }
    }

    componentDidMount() {
        list().then((data) => {
            this.setState({ employees: data })
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    checkboxChange = () => event => {
        let flag = false;
        let clanovi = this.state.members;
        for(let i = 0;  i < clanovi.length; i++){
            if(clanovi[i].person === event.target.name){
                flag = true;
                clanovi.splice(i,1);
                break;
            }
        }
        if(!flag){
            clanovi.push({person: event.target.name});
        }
            this.setState({['members']: clanovi});
    } 

    handleSubmit = () => {
        const team = {
            teamName: this.state.teamName || undefined,
            description: this.state.description || undefined,
            members :this.state.members || undefined
        }
        post(team).then((data) => {
            console.log(data)
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ redirectToProfile: true })
            }
        })
    }

    render() {
        console.log("OVDJE");
        console.log(this.state.members);
        let employeesData = this.state.employees;
        return (
        <div >
              <div className="tablediv form-group grp">
              <div className="lefts">
                    <label className="label">Name</label><br></br>
                    <input onChange={this.handleChange('teamName')} type="text" className="form-control" name="name" />

                    <label className="label">Description</label><br></br>
                    <input onChange={this.handleChange('description')} type="text" className="form-control" name="description"/>
                    </div>
                    <div>
                        <label className="label">Employees</label>
                    <table>
                        <tbody>
                        {employeesData && employeesData.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td >{item.firstName} {item.lastName}</td>
                                    <td>
                                    <Link to={"/person/" + item._id}>
                                    <Button variant="contained">
                                    About
                                    </Button>
                                    </Link>
                                    &nbsp;&nbsp;
                                    <Checkbox onChange={this.checkboxChange()} name={item._id}></Checkbox>  
                                    </td>
                                </tr>
                            )
                        })
                        } 
                        </tbody>
                    </table>    
                    </div>
                    <div>
                    <Link to="/teams" className="back"> 
                    <Button onClick={this.handleSubmit}>Back</Button>
                    </Link> 
            </div>
            </div>
            <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4 mt-20 text-right">
                        <Link to="/teams"> 
                            <button onClick={this.handleSubmit} className="btn btn-primary">Submit changes</button>
                        </Link> 
                    </div>
                </div>
        </div>
        );
    }
}

export default OneTeam;