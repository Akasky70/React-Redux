import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

import "./navbar.css";

const navbar = () => (
  <div className="navbar-wrapper">
    <div className="top-navbar clearfix">
      <div className="navbar-logo">
        <NavLink to={{ pathname: "/dashboard" }}>MyTodo</NavLink>
      </div>
      <ul>
        <li>
          <NavLink to={{ pathname: "/dashboard" }}>Home </NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/todos" }}>Todos </NavLink>
        </li>
        {/* <li>
          <NavLink to={{ pathname: "/dashboard" }}>About </NavLink>
        </li>
        <li>
          <NavLink to={{ pathname: "/dashboard" }}>Contact </NavLink>
        </li> */}
      </ul>

      <div className="navbar-right">
        <ul>
          <li>
            Akasky
            <img src={require("../../images/downarrow.png")} alt="down arrow" />
            <ul>
              <li>Log out</li>
              <li>Setting</li>
            </ul>
          </li>
          {/* <li><a href="#">Balance - 0</a></li> */}
        </ul>
      </div>
    </div>
  </div>
);

export default navbar;
