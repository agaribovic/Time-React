import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Group from '@material-ui/icons/Group';
import DateRange from '@material-ui/icons/DateRange';
import GroupWork from '@material-ui/icons/GroupWork';
import Dashboard from '@material-ui/icons/Dashboard';
import Assignment from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from "@material-ui/core/Button";
import People from '../people/people'
import { Link } from "react-router-dom";
import config from '../../config'
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    if(config.currentUser.role!="User")
    return ( 
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
          style={{ background: "#2196f3" }}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>   
          </Toolbar> 
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl'}
            </IconButton>
          </div>
          <Divider />
         
          
          <List>    
          <Link to="/dashboard">
              <ListItem button key={"Dashboard"} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen} >
                <ListItemIcon><Dashboard /></ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
              </Link>       
              <Link to="/people">
              <ListItem button key={this.props.employees} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen} >
                <ListItemIcon><Group /></ListItemIcon>
                <ListItemText primary={this.props.employees} />
              </ListItem>
              </Link>
              <Link to="/teams">
              <ListItem button key={this.props.teams} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={this.props.teams} />
              </ListItem>
              </Link>
              <Link to="/customers">
              <ListItem button key={this.props.customers} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><GroupWork /></ListItemIcon>
                <ListItemText primary={this.props.customers} />
              </ListItem>
              </Link>
              <Link to="/projects">
              <ListItem button key={this.props.projects} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><Assignment /></ListItemIcon>
                <ListItemText primary={this.props.projects} />
              </ListItem>
              </Link>
              {config.currentUser.role !== "Guest" &&
              <Link to="/calendar">
              <ListItem button key={this.props.calendars} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><DateRange /></ListItemIcon>
                <ListItemText primary={this.props.calendar}></ListItemText>
              </ListItem>
              </Link>
              }
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    )
    else return ( 
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
          style={{ background: "#2196f3" }}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              position="fixed"
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
           
          </Toolbar>
         
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <Dashboard /> : <Dashboard />}
            </IconButton>
          </div>
          <Divider />
         
          
          <List>    
          <Link to="/dashboard">
              <ListItem button key={"Dashboard"} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver=    {this.handleDrawerOpen} >
                <ListItemIcon><Dashboard /></ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
              </Link>       
              <Link to="/people">
              <ListItem button key={this.props.employees} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen} >
                <ListItemIcon><Group /></ListItemIcon>
                <ListItemText primary={this.props.employees} />
              </ListItem>
              </Link>
              <Link to="/teams">
              <ListItem button key={this.props.teams} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary={this.props.teams} />
              </ListItem>
              </Link>
              {/* <Link to="/customers">
              <ListItem button key={this.props.customers} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><GroupWork /></ListItemIcon>
                <ListItemText primary={this.props.customers} />
              </ListItem>
              </Link>
              <Link to="/projects">
              <ListItem button key={this.props.projects} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><Assignment /></ListItemIcon>
                <ListItemText primary={this.props.projects} />
              </ListItem>
              </Link> */}
              <Link to="/calendar">
              <ListItem button key={this.props.calendars} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose}  onMouseOver={this.handleDrawerOpen}>
                <ListItemIcon><DateRange /></ListItemIcon>
                <ListItemText primary={this.props.calendar}></ListItemText>
              </ListItem>
              </Link>
          </List>
        </Drawer>
        <main className={classes.content} id="main-content2">
          <div className={classes.toolbar} />
        </main>
      </div>
    )
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
