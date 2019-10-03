import React, { Component } from "react";
import "Styles/stil.css";
import Menu from "./menu";
import config from '../../config'
class Header extends Component {
  render() {
    return (
      <div className="title">
          <div className="menu">
            <Menu user={config.currentUser.name} />
          </div>
      </div>
    );
  }
}

export default Header;
