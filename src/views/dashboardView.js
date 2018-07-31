import React from "react";
import auth from "../utils/auth";

class Dashboard extends React.Component {
  render() {
    return (
      <div className="body-wrapper">
        <h2>Dashboard</h2>
        <p>Welcome to Todo {auth.getUserDetails()}</p>
      </div>
    );
  }
}

export default Dashboard;
