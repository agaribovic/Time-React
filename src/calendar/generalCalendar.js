import React, { Component } from 'react';
import dateFns from "date-fns";
import { list } from '../projects/apiProjects';
import { getOne, update } from '../calendar/apiCalendar'
import config from '../../config';
import "../assets/styles/calendar.css";
import {read} from '../people/apiPeople'
import { number } from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Spinner from '../components/spinner';
import Modal from 'react-modal';
import Grid from '@material-ui/core/Grid'; 
import TextField from "@material-ui/core/TextField";
import {formatDate} from './dateFormater';
import Typography from "@material-ui/core/Typography";
import NotLiked from '@material-ui/icons/ThumbUpAlt';
import Badge from '@material-ui/core/Badge';
import Liked from '@material-ui/icons/ThumbUpAlt';
import MenuItem from '@material-ui/core/MenuItem';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    borderRadius          : '6px'
  }
};
class CalendarDash extends Component {
  //pocetak
  constructor({match}) {
    super();
    this.state = {
      date: new Date(),
      loading: false,
      modalIsOpen: false,
      currentMonth: new Date(),
      selectedDate: new Date(),
      projects: [],
      employeesMonth: {},
      employeesName: "",
      hours: number,
      description1: "",
      description2: "",
      project1: "",
      project2: "",
      type: "",
      comment: "",
      comments: [],
      typesOfDay: ["Regular", "Vacation", "Sick"]
    };
    this.id = match.params.id;
    this.openModal = this.openModal.bind(this);
    //this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="headeri row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  onDateClick = day => {
    let data2 = this.state.employeesMonth;
    let dan = day.getDate();//greska
    dan--;
    this.setState({
      selectedDate: day,
      comments: this.state.employeesMonth.days[dan].comments,
      modalIsOpen: true,
      comments: data2.days[dan].comments,
      type : data2.days[dan].type,
      description1: data2.days[dan].tasks[0].description,
      description2: data2.days[dan].tasks[1].description,
      project1: data2.days[dan].tasks[0].projectId,
      project2: data2.days[dan].tasks[1].projectId,
      hours: data2.days[dan].hours
    });
  };

  closeModal() {
    this.setState({
      modalIsOpen: false,
      comments: [],
      description1: "",
      description2: "",
      project1: "",
      project2: "",
      type: "",
      comment: "",
      hours: null
    })
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  openModal() {
    let day = this.state.selectedDate.getDate();
    day--;
    let data2 = this.state.employeesMonth;
    this.setState({ 
      modalIsOpen: true,
      comments: data2.days[day].comments,
      type : data2.days[day].type,
      description1: data2.days[day].tasks[0].description,
      description2: data2.days[day].tasks[1].description,
      project1: data2.days[day].tasks[0].projectId,
      project2: data2.days[day].tasks[1].projectId,
      hours: data2.days[day].hours
    });
  }

  componentDidMount() {
    let day = this.state.selectedDate.getDate();
    day--;
    this.setState({ loading: true });
    setTimeout(() => {
      list().then(data => {
        //citanje projekata
        if (data) {
          this.setState({ projects: data });
        }
        this.setState({ loading: false });
      });
      read(this.id).then(data1 => {
        //citanje trenutnog ulogovanog usera
        let currMonth = data1.currentMonth;
        console.log(currMonth);
        console.log("mjesec");
        getOne(currMonth).then(data2 => {
          //dohvati njegov kalendar
          this.setState({
            employeesMonth: data2,
            employeesName: localStorage.getItem("currentEmployeeName"),
            comments: data2.days[day].comments
          });
        });
      });
    }, config.timeOut);
  }

  postComment = () => {
    let newComments = this.state.comments;
    let comm = {
      name: this.state.employeesName,
      content: this.state.comment,
      dateOfPost: new Date(),
      likes: []
    };
    newComments.push(comm);
    this.setState({ comments: newComments, comment: '' });
    let newMonth = {
        employeeId: this.state.employeesMonth.employeeId,
        days : this.state.employeesMonth.days
    }

    
    update(this.state.employeesMonth._id, newMonth).then(data => {
      if (data.error) {
        console.log(data.error);
      }
    });
  };

  handleLike = (index) =>{
    console.log(index);
    let newLike = {
      personName : this.state.employeesName,
      personId : localStorage.getItem("currentEmployee")
    }

    let newComments = this.state.comments;
    newComments[index].likes.push(newLike);
    this.setState({ comments: newComments });

    //onsole.log(this.state.employeesMonth);
    let newMonth = {
      employeeId: this.state.employeesMonth.employeeId,
      days : this.state.employeesMonth.days
    }
    
    update(this.state.employeesMonth._id, newMonth).then(data => {
      if (data.error) {
        console.log(data.error);
      }
    });
  }

  handleDissLike = (index) =>{
    let newComments = this.state.comments;
    for(let i = 0; i < newComments[index].likes.length; i++){
      if(newComments[index].likes[i].personId === localStorage.getItem("currentEmployee")){
        newComments[index].likes.splice(i, 1);
        break;
      }
    }
      
    this.setState({ comments: newComments });

    let newMonth = {
      employeeId: this.state.employeesMonth.employeeId,
      days : this.state.employeesMonth.days
    }
    
    update(this.state.employeesMonth._id, newMonth).then(data => {
      if (data.error) {
        console.log(data.error);
      }
    });
  }

  didCurrentUserLiked = (likes) =>{
    for(let i = 0; i < likes.length; i++){
      if(likes[i].personId === localStorage.getItem("currentEmployee"))return true;
    }
    return false;
  }

  render() {
    
    let day = this.state.selectedDate.getDate();
    day--;
    let varijabl = this.state.employeesMonth.days;
    console.log("stanje");
    if(this.state)console.log(this.state);
    let data;
    let shorter = this.state;
    if (this.state.loading) {
      return <Spinner/>;
    } else {
      data = (
        <div className="tablediv">
          <div className="title-button-wrapper mb-20">
            <div className="title-content">Calendar</div>
          </div>
          <div className="calendar">
            {this.renderHeader()}
            {this.renderDays()}
            {this.renderCells()}
          </div>
        </div>
      );

      return (
        <div>
            {Object.keys(this.state.employeesMonth).length === 0 ? null : (
              <div id="calendar-modal">
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.afterOpenModal}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  contentLabel="Modal"
                >
                  <Typography variant="h6" id="modal-title">
                    Make an input for {formatDate(this.state.selectedDate)}
                  </Typography>
                  {/* <h6 className = "calendar-title" ref={subtitle => (this.subtitle = subtitle)}>
                  </h6>  */}
                  <div className="comment-content-wrapper mt-20">
                    <Grid container spacing={12}>
                      <Grid item xs={6}>
                        <TextField
                            id="standard-disabled"
                            // label="Hours"
                            // className={classes.textField}
                            defaultValue={shorter.hours}
                            onChange={this.handleChange('hours')}
                            helperText="Hours"
                            margin="normal"
                            className="input-fixed-width"
                          />  
                      </Grid>
                        <TextField
                          id="select-type-of-day"
                          select
                          // label="Select type of day"
                          className="fixed-width"
                          value={this.state.type}
                          onChange={this.handleChange('type')}
                          helperText="Please select your type of day"
                          margin="normal"
                        >
                          {this.state.type === "Regular" && this.state.typesOfDay.map((item, i) => (
                          <MenuItem key={i} value={item}>
                              {item}
                          </MenuItem>
                          ))}
                          {this.state.type === "Vacation" && this.state.typesOfDay.map((item, i) => (
                          <MenuItem key={i} value={item}>
                              {item}
                          </MenuItem>
                          ))}
                          {this.state.type === "Sick" && this.state.typesOfDay.map((item, i) => (
                          <MenuItem key={i} value={item}>
                              {item}
                          </MenuItem>
                          ))}
                          {this.state.type === "" && this.state.typesOfDay.map((item, i) => (
                          <MenuItem key={i} value={item}>
                              {item}
                          </MenuItem>
                          ))}
                        </TextField>
                    </Grid>
                      <form>
                        <div className="calendar-task">
                          <h6>Task 1</h6>
                          <Grid container spacing={12}>
                            <Grid item xs={6}>
                              <TextField
                                  id="standard-disabled"
                                  // label="Description"
                                  // className={classes.textField}
                                  defaultValue={shorter.description1}
                                  onChange={this.handleChange('description1')}
                                  helperText="Description"
                                  margin="normal"
                                  className="input-fixed-width"
                                />
                            </Grid>
                            <TextField
                                id="select-project-second"
                                select
                                // label="Select"
                                value={shorter.project1}
                                className="fixed-width"
                                onChange={this.handleChange('project1')}
                                helperText="Please select your Project"
                                margin="normal"
                              >
                               {this.state.projects.map((item, j) => (
                                 
                                  <MenuItem key={j} value={item.name} >
                                    {item.name}
                                  </MenuItem>
                                
                                ))}
                              </TextField>
                          </Grid> 
                        </div>
                        <div className="calendar-task">
                          <h6>Task 2</h6>
                          <Grid container spacing={12}>
                            <Grid item xs={6}>
                              <TextField
                                  id="standard-disabled"
                                  // label="Description"
                                  // className={classes.textField}
                                  defaultValue={shorter.description2}
                                  onChange={this.handleChange('description2')}
                                  helperText="Description"
                                  margin="normal"
                                  className="input-fixed-width"
                                />
                            </Grid>
                              <TextField
                                id="select-project-second"
                                select
                                // label="Project"
                                className="fixed-width"
                                value={shorter.project2}
                                onChange={this.handleChange('project2')}
                                helperText="Please select your Project"
                                margin="normal"
                              >
                               {this.state.projects.map((item, j) => (
                                <MenuItem key={j} value={item.name}>
                                    {item.name}
                                </MenuItem>
                                ))}
                              </TextField>
                          </Grid>
                        </div>
                        
                        <div className="input-comment-wrapper">
                          <h6>Comment:</h6>
                            <div className="comment-area-wrapper">
                              <TextField
                                id="outlined-multiline-static"
                                label="Comment"
                                multiline
                                placeholder={'Enter your comment...'}
                                rows={this.state.rows}
                                value={this.state.comment}
                                defaultValue="Default Value"
                                // className={this.state.textField}
                                onChange={this.handleChange('comment')}
                                margin="normal"
                                variant="outlined"
                                className="comment-full-width"
                              />
                              <div className="comment-btn-wrapper mt-10">
                                <button type="button" className="btn btn-custom-outline" onClick={() => this.postComment()}>Post comment</button>
                              </div>
                          </div>
                        {/* <input onChange={this.handleChange("comment")} type="text" />
                        <br /> */}
                          <div className="comment-btn-wrapper mt-20">
                            <button type="button" onClick={this.closeModal} className="btn btn-custom-default mr-10">Close</button>
                            <button type="button" onClick={this.submitChanges} className="btn btn-custom-primary">Submit</button>
                          </div>
                        </div>
                        
                        {this.state.comments.length !== 0 &&
                          this.state.comments.map((item, i) => {
                            return (
                              <div>
                                <Paper className="comment-content">
                                  <h6>{item.name}</h6>
                                  <label>{item.content}</label>
                                  
                                  {item.likes && item.likes.length === 0 &&
                                  <div className="not-liked-icon">
                                    <NotLiked onClick={() => this.handleLike(i)}/> 
                                  </div>
                                  }
                                  {item.likes && item.likes.length !==0 && this.didCurrentUserLiked(item.likes) &&
                                  <div className="like-icon">
                                    <Liked onClick={() => this.handleDissLike(i)} color="#2196f3"/>
                                    <Badge badgeContent={item.likes.length}></Badge>
                                  </div>
                                  }
                                  {item.likes && item.likes.length !==0 && !this.didCurrentUserLiked(item.likes) &&
                                  <div className="not-liked-icon">
                                    <NotLiked onClick={() => this.handleLike(i)} />
                                    <Badge badgeContent={item.likes.length}></Badge>
                                  </div>
                                  }{!item.likes &&
                                    <div className="not-liked-icon">
                                    <NotLiked onClick={() => this.handleLike(i)}/> 
                                    </div>
                                  }
                                </Paper>
                                <br />
                              </div>
                            );
                          })}
                    </form>
                  </div>
              </Modal>
            </div>
          )}
          {data}
        </div>
      );
    }
  }
}

export default CalendarDash;
