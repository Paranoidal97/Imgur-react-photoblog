import React, { useState } from 'react';
import {Link} from "react-router-dom"

import { useAuth0 } from "@auth0/auth0-react";


function Navbar() {
  const { isAuthenticated } = useAuth0();
  const [ showNavbar, setShowNavbar] = useState(false)

  return (
    <nav className="navbar navbar-expand-lg  navbar-light static-top">
    <div className="container">
      <a className="navbar-brand">Łukasz Biernat</a>
      <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" onClick={()=> setShowNavbar(!showNavbar)} ></span>
      </button>
      <div className={showNavbar ? "navbar-collapse" : "collapse navbar-collapse"} id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
        
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/About" className="nav-link">About</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/Contact" className="nav-link">Contact</Link>
          </li>

          {isAuthenticated ? 
          <li className="nav-item">   
          <Link to="/Admin" className="nav-link">Admin </Link>
          </li>
           : null }
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;

