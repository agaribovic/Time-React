import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import "../assets/styles/personprofile.css";
import { read, update ,post} from "../customers/apiCustomers";
import { Link } from "react-router-dom";
import config from '../../config'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;
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
      _id: "",
      name: "",
      image: "",
      contact: "",
      phone: "",
      address: "",
      status: "",
      email:'',
      address:null
    };
  }


  handleSubmit = (customerid, close) => {
    const customer = {
      name: this.state.name || undefined,
      image: this.state.image || undefined,
      contact: this.state.contact || undefined,
      phone: this.state.phone || undefined,
      status: this.state.status || undefined,
    };
    if(customerid=='000')
    {
      post(customer).then(data=>{
		
        if (data.error) {
          console.log(data.error);
        } else { 
          close();
        }
      })
    }
    else
    update(customerid, customer).then(data => {
			
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
    this.setState({ [name]: event.target.value });
  };
  handleCloseModal=(close)=>{
    close()
  }
  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillReceiveProps(props) {
    if (props.customerid){
      console.log("uso")
      if(props.customerid=='000')
      {
        this.setState({
          name: '',
          image: '',
          contact: '',
          phone: '',
          status:'',
          address:null
        });
      }
      else
      {
        read(props.customerid).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            name: data.name,
            image: data.image,
            contact: data.contact,
            phone: data.phone,
            status:data.status,
            email:data.email,
            address:data.address
          });
        }
      })};
    }
  }
  render() {
    const { classes, open, close, customerid } = this.props;

    if (customerid) {
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          // onClose={close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
               {this.state.name}
            </Typography>
            <div className="custom-half-column">
              <TextField
                id="standard-disabled"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
                className="input-fixed-width"
              />
              <TextField
                id="standard-disabled"
                label="Contact"
                className={classes.textField}
                value={this.state.contact}
                onChange={this.handleChange("contact")}
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
                label="Address"
                className={classes.textField}
                value={this.state.address?this.state.address.city +' '+this.state.address.zipCode:'no address'}
                // onChange={this.handleChange("status")}
                margin="normal"
                className="input-fixed-width"
              />
            </div>
            <div className="custom-half-column">
              <div className="btn-wrapper-2">
                <button onClick={() => this.handleCloseModal(close)} className="btn btn-custom-default mr-10">Close</button>
                {config.currentUser.role == "Admin" &&
                <button onClick={() => this.handleSubmit(customerid, close)} className="btn btn-custom-primary">Submit changes</button>
                }
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