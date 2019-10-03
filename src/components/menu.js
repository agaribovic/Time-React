import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "Styles/stil.css";
import "Styles/hover-min.css";
import config from "../../config";
import ButtonAppBar from './muiheader'
import MiniDrawer from './muisidebar'
import MiniDrwr from './homeNavBar'
class Menu extends Component {
  render() {
    return (
     <div>       
          {!config.token && (
           <div>
            <div><ButtonAppBar></ButtonAppBar></div> 
           <div id="homeSidebar"><MiniDrwr></MiniDrwr></div>
           </div>
          )}
          {
          config.currentUser.role == "Admin" && (
           <div>
          <ButtonAppBar></ButtonAppBar>
          <MiniDrawer employees={"Employees"} teams={"Teams"} calendar={"Calendar"} customers={"Customers"} projects={"Projects"}></MiniDrawer>
          </div>
          )}
          
          {
          config.currentUser.role == "Guest" && (
            <div>
            <ButtonAppBar></ButtonAppBar>
            <MiniDrawer employees={"Employees"} teams={"Teams"} customers={"Customers"} projects={"Projects"}></MiniDrawer>
            </div>//SVE READ
          )}
          {
          config.currentUser.role == "User" && (
            <div>
          <ButtonAppBar></ButtonAppBar>
          <MiniDrawer employees={"My team members"} teams={"My Teams"} calendar={"Calendar"} ></MiniDrawer>
          </div>
          )}
          {
          config.currentUser.role == "Lead" && (
            <div>
            <ButtonAppBar></ButtonAppBar>
            <MiniDrawer employees={"Employees"} teams={"Teams"} calendar={"My calendar"} customers={"Customers"} projects={"Projects"}></MiniDrawer>
            </div>
          )}
   </div>
    )
  }
}
export default withRouter(Menu);
// export default Menu;