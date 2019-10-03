import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import "../assets/styles/personprofile.css";
import { Link } from "react-router-dom";
import { getOne, update,post} from '../projects/apiProjects';
import config from '../../config'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;
  const width = 50 ;
  const borderRadius = 6

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: `${width}%`,
    borderRadius: `${borderRadius}px`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      _id: '',
      name: '',
      description: '',
      beginDate: '',
      status: ''
  }}

  handleSubmit = (projectid,close) => {
    console.log("SUBMIT")
    const project = {
        _id: this.state._id || undefined,
        name: this.state.name || undefined,
        description: this.state.description || undefined,
        beginDate: this.state.beginDate || undefined,
        status: this.state.status || undefined,
    }
    if(projectid=='000')
    {
      post(project).then(data=>{
		
        if (data.error) {
          console.log(data.error);
        } else { 
          close();
        }
      })
    }
    else
    update(projectid, project).then(data => {
			
      if (data.error) {
        console.log(data.error);
      } else {
        close();
      }
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
}

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseModal=(close)=>{
    close()
  };
  formatDate = (badDate) =>{
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let date = new Date(badDate)

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
componentWillReceiveProps(props)
{
  if (props.projectid){
    console.log("uso")
    if(props.projectid=='000')
    {
      this.setState({
        name: '',
        description: '',
        beginDate: '',
        status:''
      });
    }
    else
    {
      getOne(props.projectid).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          name: data.name,
        description: data.description,
        beginDate: this.formatDate(data.beginDate),
        status:data.status
        });
      }
    })};
  }
}
  render() {

    const { classes, open, close, projectid } = this.props;

    if (projectid) {
      
      return (

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Project profile
            </Typography>
            <div className="custom-half-column">
              <TextField
               id="standard-disabled"
                label="Project Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange('name')}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
               id="standard-disabled"
                label="Description"
                className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
                className="input-fixed-width"
              />
            </div>
            <div className="custom-half-column">
              <TextField
               id="standard-disabled"
                label="Status"
                className={classes.textField}
                value={this.state.status}
                onChange={this.handleChange('status')}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
               id="standard-disabled"
                label="Date"
                className={classes.textField}
                value={this.state.beginDate}
                onChange={this.handleChange('Date')}
                margin="normal"
                className="input-fixed-width"
              />

              <div className="btn-wrapper">
                <Link to="/projects" > 
                    <button onClick={() => this.handleCloseModal(close)} className="btn btn-custom-default mr-10">Close</button>
                    {config.currentUser.role == "Admin" &&
                    <button onClick={() => this.handleSubmit(projectid, close)} className="btn btn-custom-primary">Submit changes</button>
                  }
                </Link> 
              </div>
            </div>
            <SimpleModalWrapped />
          </div>
        </Modal>
      );
    } else {
      return null;
    }
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
