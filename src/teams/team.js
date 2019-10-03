import React, { Component } from 'react';
import { getOne, update } from './apiTeams';
import { Link } from "react-router-dom";
import '../assets/styles/teamprofile.css';
import Button from '@material-ui/core/Button';
import {read} from '../people/apiPeople'
//import { darkBaseTheme } from 'material-ui/styles';

class OneTeam extends Component {
    constructor({ match }) {
        super()
        this.state = {
            teamName: '',
            description: '',
            redirectToProfile:'',
            members:[],
            clanovi: []
        }
        this.id = match.params.id;
    }

    componentDidMount = () => {
        let dejta;
        getOne(this.id)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    dejta = data;
                    let mem = [];
                    for (let i = 0; i < dejta.members.length; i++){
                    read(dejta.members[i].person)
                    .then((dat) => {
                        if (dat.error) {
                            console.log(dat.error)
                        }
                        else {
                            mem.push(dat);
                            this.setState({
                                teamName: dejta.teamName,
                                members: dejta.members,
                                description: dejta.description,
                                clanovi: mem
                            })
                        }
                    })}
                }
                
            })
            
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSubmit = () => {
        const team = {
            teamName: this.state.teamName || undefined,
            description: this.state.description || undefined,
            members: this.state.description || undefined
        }
        update(this.id, team).then((data) => {
            console.log(data)
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ redirectToProfile: true })
            }
        })
    }

    render() {
        let OneT = this.state;
        return (
        <div >
              <div className="tablediv form-group grp">
              <div className="lefts">
                    <label className="label">Name</label><br></br>
                    <input onChange={this.handleChange('teamName')} type="text" className="form-control" name="name" value={OneT.teamName}/>

                    <label className="label">Description</label><br></br>
                    <input onChange={this.handleChange('description')} type="text" className="form-control" name="descirption" value={OneT.description}/>
                    </div>
                    <div>
                        <label>Members</label>
                        <table>
                        <tbody>
                   {this.state.clanovi.map((item, i) => {
                       return (
                           <tr key={i}>
                               <td >{item.firstName} {item.lastName}</td>
                               <td>
                               <Link to={"/person/" + item._id}>
                                    <Button variant="contained">
                                    About
                                    </Button>
                                </Link>
                               </td>
                           </tr>
                       )
                   })
                   }
              </tbody>
            </table></div>
                <div>
                    <Link to="/teams" className="back"> 
                        <Button onClick={this.handleSubmit} variant="primary">Back</Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4 mt-20 text-right">
                        <Link to="/customers"> 
                            <button onClick={this.handleSubmit} className="btn btn-custom-primary">Submit changes</button>
                        </Link> 
                    </div>
                </div>
        </div>
        );
    }
}

export default OneTeam;