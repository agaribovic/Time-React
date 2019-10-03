import React, {Component} from 'react'
import config from '../../config';
import jwt from 'jsonwebtoken'
import {read, update} from '../people/apiPeople'

function updateLastLogin(){
    let emploFromLs = localStorage.getItem('currentEmployee');
    let newDateOfLogin={
            lastLogin : new Date()
          };
          update(emploFromLs ,newDateOfLogin).then((data4)=>{
             if(data4.error)console.log(data4);
          })
}

class Logout extends Component {

    render() {
        updateLastLogin();
        config.token = null;
        config.currentUser = {}
        config.currentEmployee = null;
        // let currentEmployee = localStorage.getItem('currentEmployee');
        // read(currentEmployee).then((data) => {
        //     let employee = data;
        //     employee.lastLogin = new Date();
        //     update(currentEmployee, employee).then((data) => {
        //       if(data.error){
        //         console.log("ERROR: " + data.error)
        //       }
        //     })
        //   })
        localStorage.clear("currentEmployee");
        this.props.history.push('/');
        return null;
    }
}

export default Logout