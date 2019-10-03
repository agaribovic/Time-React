import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import "../assets/styles/personprofile.css";
import {read as getOneP, list } from '../people/apiPeople';
import { getOne, update,post } from "../teams/apiTeams";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import config from '../../config'
import SelectPerson from './selectPerson'


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
      description: "",
      members: [],
      membersWithNames: []
    };
  }

  handleSubmit = (temid, close) => {
    const team = {
      name: this.state.name || undefined,
      description: this.state.description || undefined,
      members: this.state.members || []
    };
    if (temid == "000") {
      post(team).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          close();
        }
      });
    } else
      update(temid, team).then(data => {
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

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseModal = close => {
    close();
  };

  handleAdd = selected => {
    //1. FAZA
    let memberi = [];

    selected.forEach(element => {
      let member = { person: element.value };
      memberi.push(member);
    });

    getOne(this.state._id).then(oneTeam => {
      oneTeam.members.push(...memberi);

      update(this.state._id, oneTeam).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.props.close();
        }
      });
    });
  };

  componentWillReceiveProps(props) {
    // console.log('props',props)
    if (props.temid) {
      if (props.temid == "000") {
        this.setState({
          name: "",
          lastName: "",
          description: "",
          members: [],
          membersWithNames: []
        });
      } else {
      
        getOne(props.temid).then(data => {
          this.setState({
            _id: data._id,
            name: data.name,
            description: data.description,
            members: data.members,
          });
          if (data.error) {
            console.log(data.error);
          } else {
            let membersWithNamesAndLastNames = [];
            // array.forEach(async (item) => {
            //   await func(item);
            // })
            data.members.forEach(element => {
               getOneP(element.person).then(onePerson => {
                let newMember = {
                  fn: onePerson.firstName,
                  ln: onePerson.lastName,
                  id: onePerson._id,
                  img: onePerson.image
                };
                membersWithNamesAndLastNames.push(newMember);
                this.setState({
                  membersWithNames: membersWithNamesAndLastNames
  
                })
              });

           
            });
   
          }
        });
      }
    }
  }
  render() {
    const { classes, open, close, temid, people } = this.props;
    if (temid) {
      console.log("state", this.state);
      console.log("mms", this.state.membersWithNames);
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={close}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Team profile
            </Typography>
            <div className="custom-half-column">
              <TextField
                id="standard-disabled"
                label="Team name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin="normal"
                className="input-fixed-width"
              />
            </div>
            <div className="custom-half-column">
              <TextField
                id="standard-disabled"
                label="Description"
                className={classes.textField}
                value={this.state.description}
                onChange={this.handleChange("description")}
                margin="normal"
                className="input-fixed-width"
              />
            </div>
            <div className="members-wrapper">
              <Grid className="members-title mt-20">
                <Typography variant="h6" className={classes.title}>
                  Members
                </Typography>
                <SelectPerson
                  className="custom-half-column"
                  TransitAdd={this.handleAdd}
                  people={people}
                />
                <div>
                  <List className="lista">
                    {/* {this.state.membersWithNames[0].ln} */}
                    {this.state.membersWithNames &&
                      this.state.membersWithNames.map(item => (
                        <div className="prnt">
                          <div className="slikaMembera">
                          <Avatar className="mista" key={item._id}>
                            <img
                              src={item.img}
                              className={classes.avatar}
                              className="avatarpic"
                            />
                          </Avatar>
                          </div>
                          <div className="imeMembera">
                          <ListItem className="mista">
                            <ListItemText>
                              {item.fn} {item.ln}
                            </ListItemText>
                          </ListItem>
                        </div>
                        </div>
                      ))}
                  </List>
                </div>
              </Grid>

              <div className="mt-15 text-right">
                <button
                  onClick={() => this.handleCloseModal(close)}
                  className="btn btn-custom-default mr-10"
                >
                  Close
                </button>
                {config.currentUser.role === "Admin" &&
                <button
                  onClick={() => this.handleSubmit(temid, close)}
                  className="btn btn-custom-primary"
                >
                  Submit changes
                </button>
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

// // We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
