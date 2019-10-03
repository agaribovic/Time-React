import React, { Component } from 'react'
import { post } from './apiProjects'
import { Link } from "react-router-dom";
import '../assets/styles/projectprofile.css';
import {list} from '../customers/apiCustomers';
import config from '../../config';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
var mongoose = require('mongoose');

class Project extends Component {//pokusaj je ovo moj neki
    constructor({ match }) {
        super()
        this.state = {
            name: '',
            description:'',
            redirectToProfile: false,
            customer:'',
            customerId: '',
            allCustomers: [],
            loading: false        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        setTimeout(() => {
            list().then((data) => {
                this.setState({ allCustomers: data })
                this.setState({ loading: false })
            })
        }, config.timeOut)
    }

    handleSubmit = () => {//ima greška
        const project = {
            name: this.state.name || undefined,
            description: this.state.description || undefined,
            customer: mongoose.mongo.BSONPure.ObjectID.fromHexString(this.state.customerId) || undefined
        }
        post(project).then((data) => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ redirectToProfile: true })
            }
        })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    checkboxChange = () => event => {
            this.setState({['customerId']:  event.target.name});
            this.setState({['customer']: event.target.value});
    } 

    render() {
        console.log(this.state)
        return (
        <div className="tablediv">
            <div className="form-group">
                <div className="row mt-20">
                    <div className="col-md-2">
                        <Link to="/projects">
                            <div>
                                <h5><i className="fas fa-chevron-left"></i> Back</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-10"></div>
                </div>
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Name</label>
                        <input onChange={this.handleChange('name')} type="text" className="form-control" name="name"/>
                    </div>
                    <div className="col-md-6">
                        <label className="label">Description</label>
                        <input onChange={this.handleChange('description')} type="text" className="form-control" name="description"/>
                    </div>
                    <table className="people-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.allCustomers.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.name}</td>
                                            <td>
                                            <Link to={"/customer/" + item._id}>
                                    <Button variant="contained">
                                    About
                                    </Button>
                                    </Link>
                                    &nbsp;&nbsp;
                                    <Checkbox onChange={this.checkboxChange()} name={item._id} value={item.name}></Checkbox>  
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                </div>
                <div className="row">
                    <div className="col-md-9"></div>
                    <div className="col-md-3 mt-20 text-right">
                        <Link to="/projects"> 
                            <button onClick={this.handleSubmit} className="btn btn-primary">Add</button>
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Project