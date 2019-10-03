import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {numberOfNewComments} from './notifications';
import { read } from '../people/apiPeople';
import { Link } from 'react-router-dom'
import { getOne } from '../calendar/apiCalendar';

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  console.log("DATUM U FORMATU");
  console.log(date)

  var day = new Date(date).getDate();
  var monthIndex = new Date(date).getMonth();
  var year = new Date(date).getFullYear();

  day --;

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
  },
});

class SimplePopover extends React.Component {
  state = {
    anchorEl: null,
    numberOfNotifications: 0,
    datesOfComment: []
  };

  handleClick = event => {
   if(this.state.numberOfNotifications === 0){
    this.setState({
      anchorEl: null,
      numberOfNotifications: 0
    });
  }else{
    this.setState({
      anchorEl: event.currentTarget,
      numberOfNotifications: 0
    });
  }
  };


  componentDidMount(){ //done
    let currentMonthId, emploFromLs;
    emploFromLs = localStorage.getItem("currentEmployee");
    emploFromLs = emploFromLs.slice(0,emploFromLs.length);
    read(emploFromLs).then((data) => {
      currentMonthId = data.currentMonth;
        getOne(currentMonthId).then((data1) => {
          let num = numberOfNewComments(data,data1);
          for(let i = 0; i < num.length; i++){
            num[i].comment = formatDate(num[i].comment);
          }
          this.setState({
          numberOfNotifications : num.length,
          datesOfComment: num 
          })
        })
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  noticationUpdate = () =>{
    this.setState({
      anchorEl: null,
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton onClick={this.handleClick} color="inherit">
          <Badge badgeContent={this.state.numberOfNotifications} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div className="list-of-comments">
          {this.state.datesOfComment.map((item) => {
                return (
                  <Link to="/calendar">
                    <Typography onClick={this.noticationUpdate} className={classes.typography}><i className="fas fa-comment"></i> New coment on {item.comment}<div className="comment-time"> by {item.name}</div></Typography>
                  </Link>
                )
            })}
        </div>
        </Popover>
      </div>
    );
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopover);