import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { list } from './apiProjects'
import Spinner from '../components/spinner'
import config from '../../config'
import CustomizedTable from "../components/muiprojecttable";

class Projects extends Component {
    state = {
        projects: [],
        loading: false
    }
    ref = () => {
        this.componentDidMount();
    };

    componentDidMount() {
        this.setState({ loading: true })
        list().then((data) => {
            
            this.setState({loading:false, projects:data})
        })
        // setTimeout(() => {
        //     list().then((data) => {
        //         this.setState({ projects: data })
        //         this.setState({ loading: false })
        //     })
        // }, config.timeOut)
    }

    render() {
        if (this.state.loading)
            return <Spinner />
        else return (
            <div className="tablediv">
                <CustomizedTable projdata={this.state.projects} refresh={this.ref} />
            </div>
        )
    }
}

export default Projects