import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/home'
import Serv from './components/services'
import OurTeam from './components/ourteam'
import Login from './auth/login'
import About from './components/about'
import Contact from './components/contact'
import Logout from './components/logout'
import People from './people/people'
import Customers from './customers/customers'
import Customer from './customers/customer'
import OneCustomer from './customers/addCustomer'
import Person from './people/person'
import Calendar from './calendar/calendar'
import Teams from './teams/teams';
import Projects from './projects/projects';
import Project   from './projects/project';
import AddProject from './projects/addProject';
import OneTeam from './teams/team';
import AddTeam from './teams/addTeam';
import Profile from './people/profile';
import AddPerson from './people/addPerson';
import Dashboard from './components/dashboard';
import Redirect from './components/redirect';
import PersonalCalendar from './calendar/generalCalendar'

class MainRouter extends Component {
    render() {
        return (<div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/personalCalendar/:id" component={PersonalCalendar} />
                <Route path="/about" component={About} />
                <Route path="/teams/:id" component={OneTeam} />
                <Route path="/ourteam" component={OurTeam} />
                <Route path="/services" component={Serv} />
                <Route path="/people" component={People} />
                <Route path="/person/:id" component={Person} />
                <Route path="/addPerson" component={AddPerson} />
                <Route path="/customers" component={Customers} />
                <Route path="/customer/:id" component={Customer} />
                <Route path="/addCustomer" component={OneCustomer} />
                <Route path="/teams" component={Teams} />
                <Route path="/team/:id" component={OneTeam} />
                <Route path="/addTeam" component={AddTeam} />
                <Route path="/calendar" component={Calendar} />
                <Route exact path="/projects" component={Projects} />
                <Route path="/projects/:id" component={Project}/>
                <Route path="/addProject" component={AddProject}/>
                <Route path="/contact" component={Contact} />
                <Route path="/logout" component={Logout} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/profile/:id" component={Profile} />               
                <Route path="/auth/login" component = {Login}/>
                <Route path="/team/:id" component={OneTeam} /> 
                <Route path="/redirect" component={Redirect} />    

            </Switch>
        </div>)
    }
}

export default MainRouter