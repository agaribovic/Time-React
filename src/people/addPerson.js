import React, { Component } from 'react'
import { read, post, update} from './apiPeople'
import Button from '@material-ui/core/Button';
import P5 from 'Images/default-user-avatar.png'
import { Link } from "react-router-dom";
import 'Styles/personprofile.css'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableCell, TableHead, TableRow, ListItemAvatar, Avatar, TextField, CardActions, CardContent,  FormHelperText } from '@material-ui/core'
import { Paper, Typography, Grid, GridList } from '@material-ui/core'
import { RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Fab } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import config from '../../config'
import PropTypes from 'prop-types'



const styles = theme => ({
    root: {
        padding: '12px',
        width: '60%',
        margin: '0 auto',
        backgroundColor: '#eff',
        borderRadius: 10
    },
    textField: {
        width: '200px',
        margin: '8px    xx`x',
        padding: '8px'
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing.unit * 2
    },
    group: {
        display: 'flex',
        flexDirection: 'row'
 
    },
    nameAndIcon: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
      },
})

class Person extends Component {
    constructor( match ) {
        super();
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
            redirectToProfile: false
        }

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

        const person = {
            firstName: this.state.firstName || undefined,
            lastName: this.state.lastName || undefined,
            position: this.state.position || undefined,
            gender: this.state.gender || undefined,
            birthday: this.state.birthday || undefined,
            status: this.state.status || undefined,
            beginDate: this.state.beginDate || undefined,
            email: this.state.email || undefined,
            phone: this.state.phone || undefined,
            image: this.state.image || undefined,
            endDate: this.state.endDate || undefined
        }
        if(!this.id){
        post(person).then((data) => {
            console.log(data)
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({ redirectToProfile: true })
            }
        })
    } else {
        update(this.id, person).then((data) => {
            if(data.error){
                console.log(data.error)
            } else {
                this.setState({ redirectToProfile: true })
            }
        })
    }
    }

    render() {
        const { classes } = this.props
        return (
            <div className='container'>
                <Card elevation={12} className={classes.root}>
                <div className={classes.nameAndIcon}>
                    <h2 className='pull-left'>{this.state.firstName} {this.state.lastName}</h2>
                    {this.id &&
                    <Fab  aria-label="Delete" className={classes.fab}>
                            <a href="/people"><DeleteIcon color="primary" variant="contained" onClick={this.deletePerson}/></a>
                            </Fab>
                        }
                    </div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <div className='photoUpload'>
                                <Avatar className={classes.bigAvatar} src={config.imageUrl + this.state.image + '.jpg'} />
                                <div className='photo'>
                                    <input accept='image/*' type='file' onChange={this.handleChange('photo')} style={{ display: 'none' }} id='fileButton' />
                                </div>
                                <div className='uploadButton'>
                                <label htmlFor='fileButton' className={classes.button}>
                                    <Button variant='contained' component='span'>Upload</Button>
                                </label>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required id='firstName' label='First name' value={this.state.firstName} onChange={this.handleChange('firstName')} className={classes.textField} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField required id='lastName' label='Last name' value={this.state.lastName} onChange={this.handleChange('lastName')} className={classes.textField} margin='normal' fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="position" label="Position" className={classes.textField} value={this.state.position} onChange={this.handleChange('position')} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup
                                    id="gender"
                                    aria-label="gender"
                                    name="gender"
                                    className={classes.group}
                                    value={this.state.gender}
                                    onChange={this.handleChange('gender')}
                                >
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio color="secondary" checked={this.state.gender == "2"} />}
                                        label="Female"
                                        labelPlacement="start"
 
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio color="secondary" checked={this.state.gender == "1"} />}
                                        label="Male"
                                        labelPlacement="start"
 
                                    />
                                </RadioGroup>
                            </FormControl>
 
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {this.id && <TextField id="birthday"   label="Birthday"  className={classes.textField} value={this.state.birthday.substring(0, 10)} onChange={this.handleChange('birthday')} fullWidth />}
                            {!this.id && <TextField id="birthday"   label="Birthday"  className={classes.textField} value={this.state.birthday} onChange={this.handleChange('birthday')} fullWidth />}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="status" label="Status" className={classes.textField} value={this.state.status} onChange={this.handleChange('status')} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        {this.id && <TextField id="beginDate"   label="Begin date" className={classes.textField} value={this.state.beginDate.substring(0, 10)} onChange={this.handleChange('beginDate')} fullWidth />}
                        {!this.id && <TextField id="beginDate"   label="Begin date" className={classes.textField} value={this.state.beginDate} onChange={this.handleChange('beginDate')} fullWidth />}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="email" label="Email address" className={classes.textField} value={this.state.email} onChange={this.handleChange('email')} fullWidth />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField id="phone" label="Phone number" className={classes.textField} value={this.state.phone} onChange={this.handleChange('phone')} fullWidth />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                    {this.id &&
                        <CardActions>
                        <a href="/people"> <Button color="primary" variant="contained" onClick={this.handleSubmit} className={classes.submit}>Save</Button> </a>
                        </CardActions>}
                    {!this.id &&
                      <CardActions>
                       <a href="/people"> <Button color="primary" variant="contained" onClick={this.handleSubmit} className={classes.submit}>Add</Button> </a>
                  </CardActions>
                    }    
                    </Grid>
 
                </Card>
            </div>
        )
    }
}
 
Person.propTypes = {
    classes: PropTypes.object.isRequired
}
 
export default withStyles(styles)(Person)