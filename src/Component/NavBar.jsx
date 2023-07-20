import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import toggle from "../asset/icon.png";
import { Link } from "react-router-dom";

function NavBar() {
  return (
     <nav className="bg-black mb-5  w-100 text-light-emphasis d-flex pe-md-5 ps-5 justify-content-between">
    <h2>GetDone</h2>
    <div className="d-none d-md-block">
      <a href="#home" className="btn text-light">
        Home
      </a>
      <a href="#about" className="btn text-light">
        About
      </a>
      <Link to="/login" className="btn text-light">
        Get Started
      </Link>
    </div>
    <button className="bg-black btn-toggle border-0 d-md-none">
      <img src={toggle} alt="" />
    </button>
    <div className="toggle-content">
      <a href="#home" className="btn text-light">
        Home
      </a>
      <a href="#about" className="btn text-light">
        About
      </a>
      <Link to="/login" className="btn text-light">
        Get Started
      </Link>
    </div>
  </nav>
  )
}

export default NavBar