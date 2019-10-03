import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Button from "@material-ui/core/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class LogoutPopover extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        {/* <IconButton onClick={this.handleClick} color="inherit">
            <Badge badgeContent={7} color="secondary">
                <NotificationsIcon />
            </Badge>
        </IconButton> */}
        <IconButton
            aria-owns={undefined}
            aria-haspopup="true"
            // onClick={this.handleProfileMenuOpen}
            onClick={this.handleClick}
            color="inherit"
            >
            <AccountCircle />
        </IconButton>
        <Popover
          id="logout-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
        <Link to="/calendar" className="admin-profile">
          <Typography className={classes.typography}><i className="fas fa-user-alt"></i> Profile</Typography>
        </Link>
        <a href="http://localhost:8000" className="zinfront">
            {" "}
            <Link to="/logout" className="admin-logout">
                <Typography className={classes.typography}><i className="fas fa-sign-out-alt"></i> Logout</Typography>
            </Link>
        </a>
        </Popover>
      </div>
    );
  }
}

LogoutPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogoutPopover);