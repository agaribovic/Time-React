import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleModal from './muipersonmodal'
import Paper from '@material-ui/core/Paper';
import '../assets/styles/stil.css'
import config from '../../config';
import { Avatar,Button } from '@material-ui/core'
import Spinner from '../components/spinner'

const CustomTableCell = withStyles(theme => ({
  head: {
    color: theme.palette.common.white,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:hover': {
      backgroundColor: theme.palette.background.default,
      cursor: 'pointer'
    },
  },
});

class CustomizedTable extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false};
    this.handleClickEvent = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleNew =()=>{
    this.setState({open:true, prsnid:0})
  }
  handleClick(id) {
    {
      this.setState({ prsnid: id, open: true });
    }
  }
  // componentDidMount=()=>
  // {
  //   this.setState({ loading: true })
  // }
  handleClose() {

    this.props.refresh()
    this.setState({ open: false });
  }
  
  render() {
    const { open } = this.state;
    const { classes } = this.props;
    // if(this.state.loading)
    // return <Spinner/>
    // else
    return (
      <div className = "title-button-wrapper">
      <div className = "title-content">Employee list</div>
      {config.currentUser.role == "Admin" &&
      <div className = "add-employee-btn-wrapper">
        <button className = "btn btn-custom-outline" onClick={()=>this.handleClick('000')}><span><i className="fa fa-plus"></i></span> Add a new employee</button>
      </div>
    }
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className = "custom-table-head">
            <TableRow>
            <CustomTableCell>Image</CustomTableCell>
              <CustomTableCell>First name</CustomTableCell>
              <CustomTableCell align="left">Last name</CustomTableCell>
              <CustomTableCell align="left">Position</CustomTableCell>
              <CustomTableCell align="left">Status</CustomTableCell>
 
            </TableRow>
          </TableHead>
 
 
          <TableBody className = "custom-tbody-td">
            {this.props.ppldata.map(row => (
              <TableRow
                onClick={() => this.handleClick(row._id)}
                className={classes.row}
                key={row._id}
              >
              {/* <CustomTableCell><Avatar><img src={row.image!=''?config.imageUrl + row.image + '.jpg':config.imageUrl+'avatar.jpg'} className={classes.avatar} className="avatarpic"/></Avatar>    </CustomTableCell> */}
                <CustomTableCell><Avatar><img src={row.image } className={classes.avatar} className="avatarpic"/></Avatar>    </CustomTableCell>

              
                <CustomTableCell component="td" scope="row" >{row.firstName}</CustomTableCell>
                <CustomTableCell component="td" align="left" >{row.lastName}</CustomTableCell>
                <CustomTableCell component="td" align="left" >{row.position}</CustomTableCell>
                <CustomTableCell component="td" align="left" >{row.status==='F'?'Active':'Inactive' }</CustomTableCell>
 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <SimpleModal
          open={open}
          close={this.handleClose}
          prsnid={this.state.prsnid}
        />
      </Paper>
      </div>
    );
  }
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
