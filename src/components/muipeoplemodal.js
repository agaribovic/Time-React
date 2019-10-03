import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import "../assets/styles/personprofile.css";
import { read, update } from "../customers/apiCustomers";
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
    if (props.customerid)
      read(props.customerid).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
            let addressString = data.address.road +','+data.address.zipCode+','+ data.address.city
          this.setState({
            _id: data._id,
            name: data.name,
            image: data.image,
            contact: data.contact,
            phone: data.phone,
            address: addressString,
            status: data.status,
          });
        }
      });
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
                value={this.state.status}
                onChange={this.handleChange("status")}
                margin="normal"
                className="input-fixed-width"
              />
            </div>
            <div className="rights">
            <TextField
                id="standard-disabled"
                label="Address"
                className={classes.textField}
                value={this.state.address}
                // onChange={this.handleChange("status")}
                margin="normal"
              />
              {config.currentUser.role == "Admin" &&
                <button
                  onClick={() => this.handleSubmit(customerid, close)}
                  className="btn btn-custom-primary"
                >
                  Submit changes
                </button>
              }
                <button onClick={() => this.handleCloseModal(close)} className="btn btn-custom-default"
                >
                  Close
                </button>
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
