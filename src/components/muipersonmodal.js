import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import "../assets/styles/personprofile.css";
import { Link } from "react-router-dom";
import { read, update,update2 ,post} from "../people/apiPeople";
import config from "../../config";
import { Avatar, Grid, Button } from "@material-ui/core";



function getModalStyle() {
  const top = 50;
  const left = 50;
  const width = 50;
  const borderRadius = 6;

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
      _id: "",
      firstName: "",
      lastName: "",
      position: "",
      gender: "",
      birthDay: "",
      status: "",
      beginDate: "",
      email: "",
      phone: "",
      image: null,
      endDate: "",
      photo: null
    };
  }

  handleSubmit = (personid, close) => {
   
    const person = {
      firstName: this.state.firstName || undefined,
      lastName: this.state.lastName || undefined,
      position: this.state.position || undefined,
      gender: this.state.gender || undefined,
      birthDay: this.state.birthDay || undefined,
      status: this.state.status || undefined,
      beginDate: this.state.beginDate || undefined,
      email: this.state.email || undefined,
      phone: this.state.phone || undefined,
      endDate: this.state.endDate || undefined
    };
    person.birthDay = new Date(Date.parse(person.birthDay));
    console.log("djiefrnf")
    console.log(person);

    
    if(personid=='000')
    {
      post(person).then(data=>{
        
        if (data.error) {
          console.log(data.error);
        } else { 
          close();
        }
      })
    }
    else
    update(personid, person).then(data => {
      if (data.error) {
        console.log(data.error);
      } else { 
        console.log("DEJFEAKTA")
        console.log(data)
        close();
      }
    })
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  formatDate = (badDate) =>{
    if(badDate === undefined) return "";
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    let date = new Date(badDate)

    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
  
    if(day < 10 && monthIndex < 10)return year + '-0' + monthIndex + '-0' + day;
    else if(monthIndex < 10)return year + '-0' + monthIndex + '-' + day;
    else if(day < 10)return year + '-' + monthIndex + '-0' + day;
    else return year + '-' + monthIndex + '-' + day;
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChangePhoto = name => event => {
      const value = event.target.files[0]       
            let image = this.state.firstName//event.target.files[0].name.split(".").shift();
            this.setState({ image: image})
            
            this.userData.set("image", image)
            this.userData.set(name, value)
            // console.log('userdata',this.userData)
            update2(this.state._id, this.userData).then((data) => {
                // this.props.close()
                this.setState({image:data.image})
                if (data.error) { console.log(data.error)
                }
            }).then(this.userData.set(name, value) )//USKLADIT IP I PROBAT DA LI SE PROJMENA NA MOBITELU SLIKE ODRAZI NA WEB
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseModal = close => {
    close();
  };

  componentWillReceiveProps(props) {
    this.userData = new FormData()
    if (props.prsnid){
      read(props.prsnid).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            position: data.position,
            gender: data.gender,
            birthDay:data.birthDay,
            status: data.status,
            beginDate: data.beginDate,
            email: data.email,
            phone: data.phone,
            image: data.image,
            endDate: data.endDate
          });
        }
      });
      console.log(this.state)
    }
    else
    {
      if(props.prsnid=='000')
      {
        this.setState({
          firstName: '',
          lastName: '',
          position: '',
          gender: '',
          birthDay: '',
          status: '',
          beginDate: '',
          email: '',
          phone: '',
          image: '',
          endDate: '',
          image:null
          // image:''
        });
      }
    }
  }

  render() {
    console.log(this.state.birthDay);
    const { classes, open, close, prsnid } = this.props;
    if (prsnid) {
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            {this.props.prsnid !== '' &&
            <div>
              Open {this.state.firstName}'s calendar &nbsp;&nbsp;
            <Link to={"/personalCalendar/" + this.state._id}>
              <i className="fa fa-calendar" />
            </Link>
            </div>
          }
            <Typography variant="h6" id="modal-title">
              Employee profile
            </Typography>
            {/* <Form onSubmit={() => this.handleSubmit(prsnid,close)}> */}
            {this.props.prsnid!='000' &&
            <Grid item md={3} className="upload-img-wrapper">
              <Avatar className="upload-img">
                <img
                  src={this.state.image}
                />
              </Avatar>
              <input
                accept="image/*"
                type="file"
                onChange={this.handleChangePhoto("photo")}
                style={{ display: "none" }}
                id="fileButton"
              />
              <label htmlFor="fileButton" className="mt-20">
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            }
            <div className="custom-half-column">
              <TextField
                id="standard-disabled"
                label="First name"
                className={classes.textField}
                value={this.state.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                label="Last name"
                className={classes.textField}
                value={this.state.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                label="Gender"
                className={classes.textField}
                value={this.state.gender}
                onChange={this.handleChange("gender")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
                className="input-fixed-width"
              />
            </div>
            <div className="custom-half-column">
              <TextField
                id="standard-disabled"
                label="Phone"
                className={classes.textField}
                value={this.state.phone}
                onChange={this.handleChange("phone")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                label="Position"
                className={classes.textField}
                value={this.state.position}
                onChange={this.handleChange("position")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                type="date"
                className={classes.textField}
                value={this.state.birthDay!== "" ? this.formatDate(this.state.birthDay) : ""}
                onChange={this.handleChange("birthDay")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                label="Status"
                className={classes.textField}
                value={this.state.status}
                onChange={this.handleChange("status")}
                margin="normal"
                className="input-fixed-width"
              />

            
              <div className="btn-wrapper">
                  <button
                    onClick={() => this.handleCloseModal(close)}
                    className="btn btn-custom-default mr-10"
                  >
                    Close
                  </button>
                  {config.currentUser.role == "Admin" &&
                  <button
                    onClick={() => this.handleSubmit(prsnid, close)}
                    className="btn btn-custom-primary"
                  >
                    Submit changes
                  </button>
                  }
                  {/* <button className="btn btn-custom-primary" type="submit"></button> */}
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
