import React from "react";
import { Link, Redirect } from "react-router-dom";
import { signupUser } from "../services/userServices";

import "../components/signup/signup.css";

let userDetails = {
  name: "",
  email: "",
  password: "",
  re_password: ""
};

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      isSignedUp: false
    };
  }

  //   FUNCTION TO SETS NAME
  setName = name => {
    userDetails.name = name.target.value;
    document.getElementById("name").innerHTML = "";
  };

  //   FUNCTION TO SET EMAIL
  setEmail = email => {
    userDetails.email = email.target.value;
    document.getElementById("email").innerHTML = "";
  };

  //   FUNCTION TO SET PASSWORD
  setPassword = password => {
    userDetails.password = password.target.value;
    document.getElementById("password").innerHTML = "";
  };

  //   FUNCTION TO SET RE PASSWORD
  setRePassword = rePassword => {
    userDetails.re_password = rePassword.target.value;
    if (userDetails.re_password !== userDetails.password)
      document.getElementById("re_password").innerHTML = "Password not matched";
    else document.getElementById("re_password").innerHTML = "";
  };

  //   VAIDATION AND CALL API SERVICE ON SUCCESS
  signUp = async () => {
    const formField = ["Name", "Email", "Password", "re_password"];

    formField.forEach(field => {
      if (userDetails[field.toLowerCase()] === "") {
        const $elem = document.getElementById(field.toLowerCase());
        const msg = field === "re_password" ? "Confirm Password" : field;
        $elem.innerHTML = msg + " cannot be empty";
      }
    });

    if (userDetails.password === userDetails.re_password) {
      if (
        userDetails.name !== "" &&
        userDetails.email !== "" &&
        userDetails.password !== ""
      ) {
        const res = await signupUser(userDetails);
        if (res.status === 201) {
          this.setState({
            isSignedUp: true
          });
        } else {
          document.getElementById("internal_error").innerHTML =
            "Internal service error.";
        }
      }
    }
  };

  render() {
    return (
      <div className="body-wrapper">
        {this.state.isSignedUp ? (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                message:
                  "You're successfully registered, please login with your credentials."
              }
            }}
          />
        ) : (
          <div className="signup-form-wrapper">
            <h2>Sign Up</h2>
            <hr className="hr-design" />

            <span className="form-success" id="internal_error" />
            <input
              onChange={name => this.setName(name)}
              type="text"
              placeholder="Full Name"
            />
            <span className="form-error" id="name" />

            <input
              onChange={email => this.setEmail(email)}
              type="email"
              placeholder="Email"
            />
            <span className="form-error" id="email" />

            <input
              onChange={password => this.setPassword(password)}
              type="password"
              placeholder="Password"
            />
            <span className="form-error" id="password" />

            <input
              onChange={rePassword => this.setRePassword(rePassword)}
              type="password"
              placeholder="Confirm Password"
            />
            <span className="form-error" id="re_password" />

            <button
              className="signup-submit-button"
              onClick={() => this.signUp()}
            >
              SIGN UP
            </button>

            <hr className="hr-design" />
            <div className="signup-footer">
              <p>
                Already have account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SignUp;
