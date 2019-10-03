import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dashboard from '@material-ui/icons/Dashboard';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";

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

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

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
    //IKONE ZAMJENIT
    render() {
        const { classes, theme } = this.props;
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
                    variant="temporary"
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


                    <List onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen}>
                        <Link to="/">
                            <ListItem button key={"Home"} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen}   >
                                <i class="material-icons"> home </i>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>

                        <Link to="/about">
                            <ListItem button key={'About'} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen}   >
                                <i className="material-icons"> info </i>
                                <ListItemText primary={'About'} />
                            </ListItem>
                        </Link>

                        <Link to="/services">
                            <ListItem button key={'Services'} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen}   >
                                <i class="material-icons">settings</i>
                                <ListItemText primary={'Services'} />
                            </ListItem>
                        </Link>

                        <Link to="/ourteam">
                            <ListItem button key={'Team'} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen} >
                                <i class="material-icons">people</i>
                                <ListItemText primary={'Team'} />
                            </ListItem>
                        </Link>

                        <Link to="/contact">
                            <ListItem button key={'Contact us'} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen} >
                                <i class="material-icons">contact_mail</i>
                                <ListItemText primary={'Contact us'}></ListItemText>
                            </ListItem>
                        </Link>

                        <Divider />

                        <a href="http://localhost:5000/login?client=TK">
                            <ListItem button key={'Login'} onClick={this.handleDrawerClose} onMouseOut={this.handleDrawerClose} onMouseOver={this.handleDrawerOpen} >
                                <i class="material-icons">vpn_key</i>
                                <ListItemText primary={'Login'}></ListItemText>
                            </ListItem>
                        </a>

                    </List>
                </Drawer>

                <main className={classes.content}>
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
