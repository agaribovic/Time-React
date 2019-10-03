import React from 'react'
import '../assets/styles/services.css'
const Services = () => {
   return (
    <div className="background-landingpg">
      <div className="services pt-100 pb-50" id="services">
         <div className="container">
            <h4 className='services-title'>Services</h4><span className="title-underline"></span>
            <div className="row">
               <div className="col-lg-4 col-md-6">
                  <div className="single-service">
                     <i className="fa fa-laptop"></i>
                     <h4> UI/UX design </h4>
                     <p>We give your products a shiny new coat of paint and great UX, following well-established usability principles. </p>
                  </div>
               </div>
               <div className="col-lg-4 col-md-6">
              
                  <div className="single-service">
                     <i className="fa fa-gears"></i>
                     <h4>Web Development</h4>
                     <p>We're skilled in creating anything from small widgets to large, enterprise-class web applications using MERN stack. </p>
                  </div>
               </div>
               <div className="col-lg-4 col-md-6">
                  
                  <div className="single-service">
                     <i className="fa fa-mobile"></i>
                     <h4>Mobile apps</h4>
                     <p> We're highly specialized in developing native and web apps for iOS, Android and Windows Phone devices. </p>
                  </div>
               </div>
            
            </div>
         </div>
      </div>
      </div>
   )
}

export default Services