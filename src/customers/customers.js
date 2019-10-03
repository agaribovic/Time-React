import React, { Component } from 'react'
import { list } from './apiCustomers'
import Spinner from '../components/spinner'
import config from '../../config'
import CustomizedTable from "../components/muicustomertable";

class Customers extends Component {
    state = {
        customers: [],
        loading: false
    }

    ref = () => {
        this.componentDidMount();
    };
    componentDidMount() {
        this.setState({ loading: true })
        setTimeout(() => {
            list().then((data) => {
                this.setState({ customers: data })
                this.setState({ loading: false })
            })
        }, config.timeOut)

    }
    render() {

        if (this.state.loading)
            return <Spinner />
        else return (
            <div className="tablediv">
                <CustomizedTable customers={this.state.customers} refresh={this.ref} />
            </div>)
    }
}

export default Customers;
