import React from "react";
import auth from "../utils/auth";
import { connect } from "react-redux";
import "../components/login/login.css";
import { login } from "../services/loginServices";
import { Redirect, Link } from "react-router-dom";

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

class UserLogin extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      isLogedIn: false,
      errorMessage: ""
    };
  }

  // SET EMAIL OR PASSWORD STATE
  setStateValue = (stateName, input) => {
    if (stateName === "email") {
      this.setState({
        email: input.target.value,
        errorMessage: ""
      });
    } else if (stateName === "password") {
      this.setState({
        password: input.target.value,
        errorMessage: ""
      });
    }
  };

  //   LOGIN REQUEST
  requetLogin = async () => {
    const email = this.state.email;
    const password = this.state.password;

    const loginResponse = await login(email, password);

    if (loginResponse.status === 200) {
      auth.authenticate(loginResponse.data);

      this.setState({
        isLogedIn: true
      });
    } else {
      console.log(loginResponse);
      this.setState({
        errorMessage: loginResponse.response.data.statusMessage
      });
    }
  };

  // RENDERING LOGIN
  render() {
    return this.state.isLogedIn ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="login-form">
        {/* <form> */}
        <h2>Login</h2>
        <hr className="hr-design" />
        <label className="register-success-message">
          <p>
            {this.props.location.state ? this.props.location.state.message : ""}
          </p>
        </label>
        <label>{this.state.errorMessage}</label>
        <input
          onChange={input => this.setStateValue("email", input)}
          name="email"
          type="text"
          placeholder="Enter email"
          autoComplete="off"
        />
        <input
          onChange={input => this.setStateValue("password", input)}
          name="password"
          type="password"
          placeholder="Enter email"
        />
        <button onClick={this.requetLogin}>LOGIN</button>
        {/* </form> */}
        <hr className="hr-design" />
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </div>
    );
  }
}

const userLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogin);

export default userLogin;
