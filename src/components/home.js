import React, {Component} from 'react'
import { Link } from "react-router-dom";
import 'Styles/stil.css'
import 'Styles/hover-min.css'
import config from '../../config'
class Home extends Component {
  
  render() 
  {
    return (
    <div className="background-landingpg custom-sm">
      {!config.token &&
        <div className="meetTimekeeper">
          <h1>Meet TimeKeeper</h1>
          <h2>a revolutionary solution for workplace management and employee hour utilization</h2>
        <div >
        <Link to="/about">
          <div>
            <h5 className ="hvr-grow">Learn More</h5>
          </div>
        </Link>
        </div>
      </div>
      }
      </div>
    )}
}
export default Home