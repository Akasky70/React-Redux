import React from "react";
import auth from "../../utils/auth";
import { Redirect, NavLink } from "react-router-dom";

import "./navbar.css";

class Navabr extends React.Component {
  constructor() {
    super();

    this.state = {
      isLogeOut: 0
    };
  }

  // SET LOGOUT TRUE OR FALSE
  lougoutUser = () => {
    auth.clearToken("id");
    auth.clearToken("name");
    auth.clearToken("access_token");
    auth.clearToken("refresh_token");

    this.setState({
      isLogeOut: this.state.isLogeOut + 1
    });
  };

  // RENDERS NAVBAR
  render() {
    return (
      <div className="navbar-wrapper">
        {!auth.getToken() ? <Redirect to={{ pathname: "/" }} /> : <span />}

        <div className="top-navbar clearfix">
          <div className="navbar-logo">
            <NavLink to={{ pathname: "/dashboard" }}>MyTodo</NavLink>
          </div>
          <ul>
            {auth.getToken() ? (
              <span>
                <li>
                  <NavLink to={{ pathname: "/dashboard" }}>Home </NavLink>:
                </li>
                <li>
                  <NavLink to={{ pathname: "/todos" }}>Todos </NavLink>
                </li>
              </span>
            ) : (
              <span />
            )}
            <li>
              <NavLink to={{ pathname: "/dashboard" }}>About </NavLink>
            </li>
            <li>
              <NavLink to={{ pathname: "/dashboard" }}>Contact </NavLink>
            </li>
          </ul>

          <div className="navbar-right">
            <ul>
              <li>
                {!auth.getToken() ? (
                  <NavLink to={{ pathname: "/login" }}>Login </NavLink>
                ) : (
                  <div>
                    {auth.getUserDetails()}
                    <img
                      src={require("../../images/downarrow.png")}
                      alt="down arrow"
                    />
                    <ul>
                      <li onClick={this.lougoutUser}>Log out</li>
                      <li>Setting</li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                {!auth.getToken() ? (
                  <NavLink to={{ pathname: "/signup" }}>Sign Up </NavLink>
                ) : (
                  <span />
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Navabr;
