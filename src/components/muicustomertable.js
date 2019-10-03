import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SimpleModal from './muicustomermodal';
import Paper from '@material-ui/core/Paper';
import '../assets/styles/stil.css';
import config from '../../config';

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
    this.state = { open: false };
    this.handleClickEvent = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(id) {
    {
      this.setState({ customerid: id, open: true });
    }
  }
  handleClose() {

    this.props.refresh()
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <div className = "title-button-wrapper">
        <div className = "title-content">Customers list</div>
        {config.currentUser.role == "Admin" &&
        <div className = "add-employee-btn-wrapper">
          <button className = "btn btn-custom-outline" onClick={()=>this.handleClick('000')}><span><i className="fa fa-plus"></i></span> Add a new customer</button>
        </div>
        }
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead className = "custom-table-head">
            <TableRow>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell align="left">Contact person</CustomTableCell>
              <CustomTableCell align="left">Email</CustomTableCell>
              <CustomTableCell align="left">Phone</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="custom-tbody-td">
            {this.props.customers.map(row => (
              //   <Link to={"/person/"+row._id}>
              <TableRow
                onClick={() => this.handleClick(row._id)}
                className={classes.row}
                key={row._id}
              >
                <CustomTableCell component="td" scope="row">{row.name}</CustomTableCell>
                <CustomTableCell component="td" align="left">{row.contact}</CustomTableCell>
                <CustomTableCell component="td" align="left">{row.email}</CustomTableCell>  
                <CustomTableCell component="td" align="left">{row.phone}</CustomTableCell>                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <SimpleModal
          open={open}
          close={this.handleClose}
          customerid={this.state.customerid}
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
