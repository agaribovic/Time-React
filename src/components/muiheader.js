import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../assets/styles/stil.css";
import config from "../../config";
import tkLogo from '../assets/images/tklogo.png'
import SimplePopover from '../components/popover'
import LogoutPopover from '../components/logoutPopover'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
 
  const { classes } = props;
  //let link = this.props.link;
  if (!config.token)
    return (
      <div className={classes.root}>
        <AppBar
          color="default"
          position="static"
          style={{ background: "#2196f3" }}
        >
          <Toolbar>
            <Typography className={classes.grow}>
              <Link to='/'> <img src={ tkLogo } className="tk-logo"/> </Link>
              {/* <h5 className="tk-title">Timekeeper</h5> */}
            </Typography>

            <Link to="/" className="hvr-underline-reveal">
              <div>
                <Button
                  id="home-btn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Home
                </Button>
              </div>
            </Link>
            <Link to="/about" className="hvr-underline-reveal">
              <div>
                <Button
                  id="about-btn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  About
                </Button>
              </div>
            </Link>
            <Link to="/services" className="hvr-underline-reveal">
              <div>
                <Button
                  id="services-btn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Services
                </Button>
              </div>
            </Link>
            <Link to="/ourteam" className="hvr-underline-reveal">
              <div>
                <Button
                  id="team-btn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Team
                </Button>
              </div>
            </Link>
            <Link to="/contact" className="hvr-underline-reveal">
              <div>
                <Button
                  id="contact-us-btn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Contact us
                </Button>
              </div>
            </Link>

            <a href="http://localhost:5000/login?client=TK">
              <Button
                id="log-in-btn"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Log in
              </Button>
            </a>
          </Toolbar>
        </AppBar>
      </div>
    );
  else // if (config.currentUser.role == "Admin")
    return (
      <div>
        <div className={classes.root}>
          <AppBar
            color="default"
            position="static"
            style={{ background: "#2196f3" }}
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                Timekeeper
              </Typography>
              <div className="admin-notify-wrapper">
                <SimplePopover />
                <LogoutPopover />
              </div>
                {/* <Button
                  id="log-out-btn"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Log out
                </Button> */}
            </Toolbar>
          </AppBar>
        </div>
      
      </div>
    );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
