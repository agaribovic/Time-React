import React, {Component} from 'react'
import config from '../../config';
import jwt from 'jsonwebtoken'

class Redirect extends Component {
    render() {
       
        this.props.history.push('http://localhost:5000')
        return null
    }
}

export default Redirect