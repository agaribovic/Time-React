import React, { Component } from 'react'
import { getOne,  update} from './apiProjects'
import { Link } from "react-router-dom";
import '../assets/styles/projectprofile.css';
import {read} from '../customers/apiCustomers'
//import { darken } from 'material-ui/utils/colorManipulator';

class Project extends Component {//pokusaj je ovo moja neki
    constructor({ match }) {
        super()
        this.state = {
            name: '',
            description:'',
            redirectToProfile: false,
            customer: ''
        }
        this.id = match.params.id;
    }

    componentDidMount = () => {
        getOne(this.id)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else { 
                    read(data.customer)
                    .then((dar) =>{

                        if(dar.error){
                            console.log(dar.error)
                        } else{
                            this.setState({
                                name: data.name,
                                description: data.description,
                                customer:dar.name
                            })
                        }
                    })
                    
                }
            })
    }

    handleSubmit = () => {
        const project = {
            name: this.state.name || undefined,
            description: this.state.description || undefined,
            customer: this.state.customer || undefined
        }
        update(this.id, project).then((data) => {
            console.log(data)
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

    render() {
        // let project = this.state;
        // console.log("PROJEKAD");
        // console.log(project);
        return (
        <div className="tablediv">
            <CustomizedTable projdata={this.state.project} refresh={this.ref} />
        </div>

        // <div className="tablediv">
            // <div className="form-group">
            //     <div className="row mt-20">
            //         <div className="col-md-2">
            //             <Link to="/projects">
            //                 <div>
            //                     <h5><i className="fas fa-chevron-left"></i> Back</h5>
            //                 </div>
            //             </Link>
            //         </div>
            //         <div className="col-md-10"></div>
            //     </div>
            //     <div className="row mt-20">
            //         <div className="col-md-6">
            //             <label className="label">Name</label>
            //             <input onChange={this.handleChange('name')} type="text" className="form-control" name="name" value={project.name} />
            //         </div>
            //         <div className="col-md-6">
            //             <label className="label">Description</label>
            //             <input onChange={this.handleChange('description')} type="text" className="form-control" name="description" value={project.description} />
            //         </div>
            //         <div className="col-md-6">
            //             <label className="label">Customer</label>
            //             <input onChange={this.handleChange('customer')} type="text" className="form-control" name="customer" value={project.customer} />
            //         </div>
            //     </div>
            //     <div className="row">
            //         <div className="col-md-9"></div>
            //         <div className="col-md-3 mt-20 text-right">
            //             <Link to="/projects"> 
            //                 <button onClick={this.handleSubmit} className="btn btn-primary">Submit changes</button>
            //             </Link> 
            //         </div>

            //     </div>
            // </div>
        // </div>
        );
    }
}

export default Project