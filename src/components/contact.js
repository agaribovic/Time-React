import React, { Component } from 'react'
import '../assets/styles/contact.css'
import '../assets/styles/stil.css'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import postService from '../components/react-service'
import Swal from 'sweetalert2'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400 
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },

  input: {
    color: 'white',
  },

  label: {
    color: 'white', opacity: 0.5
  },

  buttonContact: {
    color: 'white',
    backgroundColor: '#2196F3',
      '&:hover': {
        backgroundColor: '#2196F3',
        color: 'white'
      }
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    } 
  },
  typography: { useNextVariants: true },
});

class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    Swal.fire({
      title: 'Thank you!',
      text: 'The email has been successfully sent.',
      type: 'success',
      confirmButtonText: 'OK'
    })
    event.preventDefault()

    postService.post(this.state).then(() => {
      window.location.reload()
    });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { name, email, phone, message } = this.state;

    return (
      <div className="background-landingpg">
        <h4 className="contact-title">Contact Us</h4>
        <div className="contact-form">
          <div className={classes.container}>
            <ValidatorForm
              className="isco"
              ref="form"
              onSubmit={this.handleSubmit}
              onError={errors => console.log(errors)}>
              <MuiThemeProvider theme={theme}>
                <TextValidator
                  className={classes.textField}
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.label
                  }}
                  id="standard-name"
                  label={'Name'}
                  onChange={(event) => this.handleChange(event, 'name')}
                  name="name"
                  value={name}
                  validators={['required', 'minStringLength: 3', 'maxStringLength: 70']}
                  errorMessages={['Name is required', '3 characters min.', '70 characters max.']}
                  margin="normal"
                  variant="filled"
                  placeholder='John Doe'
                />

                <TextValidator
                  className={classes.textField}
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.label
                  }}
                  id="standard-email"
                  label={'Email'}
                  onChange={(event) => this.handleChange(event, 'email')}
                  name="email"
                  value={email}
                  margin="normal"
                  variant="filled"
                  validators={['required', 'isEmail']}
                  errorMessages={['Email is required', 'Email is not valid']}
                  placeholder='johndoe@example.com'
                />

                <TextValidator
                  className={classes.textField}
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.label
                  }}
                  id="standard-phone"
                  label={'Phone'}
                  onChange={(event) => this.handleChange(event, 'phone')}
                  name="phone"
                  value={phone}
                  margin="normal"
                  variant="filled"
                  validators={['required', 'minNumber:0', 'maxNumber:123456789101112131415']}
                  errorMessages={['Phone number is required', 'Invalid number format', '20 digits max.']}
                  placeholder="+387(61)-123-456"
                />

                <TextValidator
                  id="filled-textarea"
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.label
                  }}
                  name='message'
                  value={message}
                  label={'Message'}
                  onChange={(event) => this.handleChange(event, 'message')}
                  placeholder="Hello, regarding the services you offer, may I ask..."
                  multiline
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                  validators={['required']}
                  errorMessages={['Message is required']}
                />

              </MuiThemeProvider>
              <div className="mt-20 mb-100">
                <Button variant="contained" color="primary" className={classes.buttonContact} type="submit">
                  Send
             {/* U index.html dodati link za font icons */}
                  <Icon className={classes.rightIcon}>send</Icon>
                </Button>
              </div>
            </ValidatorForm>
          </div>

        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Contact)