import React, {Component} from 'react'
import config from '../../config';
import jwt from 'jsonwebtoken';
import {list} from '../people/apiPeople'

function findEmplooyee(email){
    let id, allEmployees, ime;
    return list().then((data) => {  
        allEmployees = data;
        for(let i = 0; i < allEmployees.length; i++){       
            if(allEmployees[i].email === email){
                id = allEmployees[i]._id;
                ime = allEmployees[i].firstName + ' ' + allEmployees[i].lastName;
            }
        }
        config.currentEmployee = id;
        localStorage.setItem("currentEmployee", id);
        localStorage.setItem("currentEmployeeName", ime);
      });
}

class Login extends Component {
    render() {
        let token = this.props.location.search.substring(7)
        if (token !== undefined) {
            jwt.verify(token, config.secret, (err, result) => {
                if (!err) {
                    config.currentUser = result
                    config.token = token
                    findEmplooyee(config.currentUser.sub).then(() => {
                        this.props.history.push('/dashboard');
                        return null;
                    });
                }
            })
        }
        return null;
    }

}

export default Login