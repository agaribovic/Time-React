import React, { Component } from 'react';
import { post } from './apiCustomers';
import { Link } from "react-router-dom";
import '../assets/styles/customerprofile.css';
import Button from '@material-ui/core/Button';

class Customer extends Component {
    constructor({ match }) {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            contact: '',
            redirectToProfile: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSubmit = () => {
        console.log("SUBMIT")
        const customer = {
            name: this.state.name || undefined,
            email: this.state.email || undefined,
            phone: this.state.phone || undefined,
            contact: this.state.contact || undefined
        }
        post(customer).then((data) => {
            console.log(data)
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ redirectToProfile: true })
            }
        })
    }


    render() {
        return (

        <div className="tablediv">
            <div className="form-group">
                <div className="row mt-20">
                    <div className="col-md-2">
                        <Link to="/customers">
                            <div>
                                <h5><i className="fas fa-chevron-left"></i> Back</h5>
                            </div>
                        </Link>
                    </div>
                    <div className="col-md-10"></div>
                </div>
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Name</label><br></br>
                        <input onChange={this.handleChange('name')} type="text" className="form-control" name="name"/>
                    </div>
                    <div className="col-md-6">
                        <label className="label">Email</label><br></br>
                        <input onChange={this.handleChange('email')} type="text" className="form-control" name="email"/>
                    </div>
                </div>
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Phone</label><br></br>
                        <input onChange={this.handleChange('phone')} type="text" className="form-control" name="phone" />
                    </div>
                    <div className="col-md-6">
                        <label className="label">Contact</label><br></br>
                        <input onChange={this.handleChange('contact')} type="text" className="form-control" name="contact" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8"></div>
                    <div className="col-md-4 mt-20 text-right">
                        <Link to="/customers"> 
                            <button onClick={this.handleSubmit} className="btn btn-primary">Add</button>
                        </Link> 
                    </div>
                </div>

            </div>
        </div>
        );
    }
}

export default Customer;