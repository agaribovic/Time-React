import React, { Component } from 'react'
import { read } from './apiPeople'
import { Link } from "react-router-dom";
import 'Styles/personprofile.css'

class Profile extends Component {
    state = {
        user: {}
    }

    componentDidMount = () => {
        let id = this.props.match.params.id;
        read(id)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    this.setState({ user: data })
                    console.log(user)
                }
            })
    }

    render() {
        let oneUser = this.state.user;
        if(oneUser.gender == 1) {
            oneUser.gender = 'Male';
        }else{
            oneUser.gender = 'Female';
        }
        return (
        <div className="tablediv">
            <div className="form-group">
            <div className="lefts">
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Name</label>
                        <input type="text" className="form-control" name="name" value={oneUser.firstName} />
                    </div>
                    <div className="col-md-6">
                        <label className="label">Last Name</label>
                        <input type="text" className="form-control" name="lastname" value={oneUser.lastName} />
                    </div>
                </div>
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Gender</label>
                        <input type="text" className="form-control" name="name" value={oneUser.gender} />
                    </div>
                    <div className="col-md-6">
                        <label className="label">Email</label>
                        <input type="text" className="form-control" name="name" value={oneUser.email} />
                    </div>
                </div>
                </div>
                <div className="rights">
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Phone</label>
                        <input type="text" className="form-control" name="name" value={oneUser.phone} />
                    </div>
                    <div className="col-md-6">
                        <label className="label">Position</label>
                        <input type="text" className="form-control" name="name" value={oneUser.position} />
                    </div>
                </div>
                <div className="row mt-20">
                    <div className="col-md-6">
                        <label className="label">Bithday</label>
                        <input type="text" className="form-control" name="name" value={oneUser.birthDay} />
                    </div>
                    <div className="col-md-6">
                        <label className="label">Status</label>
                        <input type="text" className="form-control" name="name" value={oneUser.status} />
                    </div>
                </div>  
                </div>
            </div>
            <Link to="/people" className="back">
                <div>
                  <h5>Back</h5>
                </div>
              </Link>
        </div>
        );
    }
}

export default Profile