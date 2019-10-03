import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'  
import spinnerCSS from '../assets/styles/spinner.css'


const styles = theme => ({
    panel: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        backgroundColor: 'lightGray',
        opacity: 0.7
    }
})

class Spinner extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.panel}>
            <div className="ring">
            <div className="lds-css ng-scope">
            <div className="lds-double-ring">
            <div></div><div></div></div></div>
            </div>
            </div>
        )
    }
}

export default withStyles(styles)(Spinner)