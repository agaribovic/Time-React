import React, { Component } from 'react'
import { read, update } from './apiPeople'
import { Avatar, Card, Grid, TextField, CardActions, CardContent, Dialog, Button } from "@material-ui/core"
import 'Styles/personprofile.css'
import config from '../../config'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
    root: {
        padding: '12px',
        width: 720,
        margin: '0 auto',
        backgroundColor: '#eff'
    },
    textField: {
        width: 450,
        margin: '8px',
        padding: '8px'
    },
    submit: {
        margin: '12px auto'
    },
    image: {
        float: 'right',
        width: '120px',
        height: '120px'
    },
    button: {
        float: 'right',
        width: '100px',
        marginTop: '12px'
    }
})

class Person extends Component {
    constructor({ match }) {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            position: '',
            gender: '',
            birthday: '',
            status: '',
            beginDate: '',
            email: '',
            phone: '',
            image: '',
            endDate: '',
            photo: null,
            redirectToProfile: false 
        }
        this.id = match.params.id;

        console.log(this.id);
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
     
    handleClose = () => {
        this.setState({ open: false });
      };
     

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }
    

    componentDidMount = () => {
        this.userData = new FormData()
        
        read(this.id)
            .then((data) => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    this.setState({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        position: data.position,
                        gender: data.gender,
                        birthday: data.birthday,
                        status: data.status,
                        beginDate: data.beginDate,
                        email: data.email,
                        phone: data.phone,
                        image: data.image,
                        endDate: data.endDate,
                    })
                }
            })
    }
    handleChange2 = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        this.userData.set(name, value)
        this.setState({ [name]: value })
    }

    handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        if (name === 'photo') {
            let image = event.target.files[0].name.split(".").shift();
            this.setState({ image: image })
            this.userData.set("image", image)
            update(this.id, this.userData).then((data) => {
                if (data.error) { console.log(data.error) }
            }).then(this.userData.set(name, value))
        }
        if (name !== 'photo' && name !== 'image') {
            this.setState({ [name]: event.target.value })
            this.userData.set(name, value)
        }
    }


    handleSubmit = () => {
        console.log("SUBMIT")
        // const person = {
        //     firstName: this.state.firstName || undefined,
        //     lastName: this.state.lastName || undefined,
        //     position: this.state.position || undefined,
        //     gender: this.state.gender || undefined,
        //     birthday: this.state.birthday || undefined,
        //     status: this.state.status || undefined,
        //     beginDate: this.state.beginDate || undefined,
        //     email: this.state.email || undefined,
        //     phone: this.state.phone || undefined,
        //     image: this.state.image || undefined,
        //     endDate: this.state.endDate || undefined
        // }
        update(this.id, this.userData).then((data) => {
            if (data.error) { console.log(data.error) } else {
                this.setState({ redirectToProfile: true })
            }
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange = () => this.handleClickOpen();

    render() {
        const { classes } = this.props

        let oneUser = this.state;
        if (oneUser.gender == 'M') {
            oneUser.gender = 'Male';
        } else {
            oneUser.gender = 'Female';
        }

        return (
            <div className='container'>
                <Card elevation={24} className={classes.root}>
                    <CardContent>
                        <Grid container spacing={8}>
                            <Grid item md={9}>
                                <h2 className='pull-left'>{this.state.firstName} {this.state.lastName}</h2>
                                <div className='clearfix'></div>

                                <TextField id='firstName' label='First name' value={this.state.firstName} onChange={this.handleChange('firstName')} className={classes.textField} margin='normal' /><br />

                                <TextField id='lastName' label='Last name' value={this.state.lastName} onChange={this.handleChange('lastName')} className={classes.textField} margin='normal' /><br />

                                <TextField id='position' label='Position' className={classes.textField} value={this.state.position} onChange={this.handleChange('position')} margin='normal' /> <br />

                                <TextField id='gender' label='Gender' className={classes.textField} value={this.state.gender} onChange={this.handleChange('gender')} margin='normal' value={oneUser.gender} /><br />

                                <TextField id='birthday' label='Birthday' className={classes.textField} value={this.state.birthday} onChange={this.handleChange('birthday')} margin='normal' /> <br />

                                <TextField id='status' label='Status' className={classes.textField} value={this.state.status} onChange={this.handleChange('status')} margin='normal' /> <br />

                                <TextField id='beginDate' label='Employed on' className={classes.textField} value={this.state.beginDate} onChange={this.handleChange('beginDate')} margin='normal' /><br />

                                <TextField id='image' label='image' className={classes.textField} value={this.state.image} onChange={this.handleChange2('image')} margin='normal' />

                                {this.state.status !== 'F' &&

                                    <span><br />
                                        <TextField id='endDate' label='Left on' className={classes.textField} value={this.state.endDate} onChange={this.handleChange('endDate')} margin='normal' />
                                    </span>
                                }
                                <CardActions>
                                    <Button color='primary' variant='contained' onClick={this.handleSubmit} className={classes.submit}> Submit </Button>
                                </CardActions>
                            </Grid>
                            <Grid item md={3}>
                                <Avatar className={classes.image}>
                                    <img src={config.imageUrl + this.state.image + '.jpg'} />
                                </Avatar>
                                <input accept='image/*' type='file' onChange={this.handleChange('photo')} style={{ display: 'none' }} id='fileButton' />
                                <label htmlFor='fileButton' className={classes.button}>
                                    <Button variant='contained' component='span'>Upload</Button>
                                </label>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </div>

        );
    }
}

Person.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Person)


