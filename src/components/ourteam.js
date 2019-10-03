import React, {Component} from 'react'
import 'Styles/team.css'
import 'Styles/stil.css'
import P1 from 'Images/P1.jpg'
import P2 from 'Images/P2.jpg'
import P3 from 'Images/P3.jpg'
import P4 from 'Images/P4.jpg'
import info from '../assets/data/teamInfo'
class OurTeam extends Component {
    render() {
    return (
        <div className='background-landingpg'> 
            <div className = "container">
                <h4 className='team-title'>Apollo Team</h4><span className="title-underline"></span>   
                <div className="row">     
                    <div className="team-content col-md-3 text-center team-content">
                        <img src={P1} className='servImg1'></img>
                            <div className='servTitle1'>{info.members.names.name4}</div>
                            <ul className="social-icons icon-circle icon-zoom list-unstyled list-inline"> 
                                <li> <a href="https://www.linkedin.com/in/jasmin-tiric-65687437/"><i className="fa fa-linkedin"></i></a></li> 
                                    <li> <a href="https://twitter.com"><i className="fa fa-twitter"></i></a></li>
                                <li> <a href="https://plus.google.com"><i className="fa fa-google-plus"></i></a></li>
                            </ul>
                            <div className="position">{info.members.titles.title4}</div>
                            <div className="opis">
                                <p> {info.members.descriptions.desc1}</p>
                            </div>
                    </div>
                    <div className="team-content col-md-3 text-center team-content">
                        <img src={P2} className='servImg1'></img>
                        <div className='servTitle1'>{info.members.names.name3}</div>
                        <ul className="social-icons icon-circle icon-zoom list-unstyled list-inline"> 
                            <li> <a href="https://www.linkedin.com/in/alen-garibovi%C4%87-41977b157/"><i className="fa fa-linkedin"></i></a></li> 
                                <li> <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a></li>
                            <li> <a href="https://plus.google.com"><i className="fa fa-google-plus"></i></a></li>
                        </ul>
                        <div className="position">{info.members.titles.title1}</div>
                        <div className="opis">
                            <p> {info.members.descriptions.desc2}</p>
                        </div>
                    </div>
                    <div className="team-content col-md-3 text-center team-content">
                        <img src={P3} className='servImg1'></img>
                        <div className='servTitle1'>{info.members.names.name2}</div>
                        <ul className="social-icons icon-circle icon-zoom list-unstyled list-inline"> 
                            <li> <a href="https://www.linkedin.com/in/zakir-%C4%8Dinjarevi%C4%87-a48ba3173/"><i className="fa fa-linkedin"></i></a></li> 
                            <li> <a href="https://twitter.com"><i className="fa fa-twitter"></i></a></li>
                            <li> <a href="https://plus.google.com"><i className="fa fa-google-plus"></i></a></li>
                        </ul>
                        <div className="position">{info.members.titles.title2}</div>
                        <div className="opis">
                            <p> {info.members.descriptions.desc3}</p>
                        </div>
                    </div>
                    <div className="team-content col-md-3 text-center team-content">
                        <img src={P4} className='servImg1'></img>
                        <div className='servTitle1'>{info.members.names.name1}</div>
                        <ul className="social-icons icon-circle icon-zoom list-unstyled list-inline"> 
                            <li> <a href="https://www.linkedin.com/in/amel-karsic-3a4751180/"><i className="fa fa-linkedin"></i></a></li> 
                            <li> <a href="https://twitter.com/"><i className="fa fa-twitter"></i></a></li>
                            <li> <a href="https://plus.google.com"><i className="fa fa-google-plus"></i></a></li>
                        </ul>
                        <div className="position">{info.members.titles.title3}</div>
                        <div className="opis">
                            <p> {info.members.descriptions.desc4}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}  
}

export default OurTeam

