import React, { Component } from "react";

//import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import { BrowserRouter as Link } from "react-router-dom";
import ReactTelInput from "react-telephone-input";
import "./Admin.css";
import Admin1 from "./Admin1";
import axios from "axios";

//var ReactTelInput = require('react-telephone-input');
function handleInputChange(telNumber, selectedCountry) {
  console.log(
    "input changed. number: ",
    telNumber,
    "selected country: ",
    selectedCountry
  );
}
function handleInputBlur(telNumber, selectedCountry) {
  console.log(
    "Focus off the ReactTelephoneInput component. Tel number entered is: ",
    telNumber,
    " selected country is: ",
    selectedCountry
  );
}
export default class Admin extends Component {
  constructor(props) {
    super(props);
    if (localStorage.usertoken) {
      this.props.history.push(`/`);
    }

    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConfirm: true,
      errors: [],
      registered: false,
    };
  }
  handleName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handlePasswordConfirm = (event) => {
    if (event.target.value === this.state.password) {
      this.setState({
        passwordConfirm: true,
      });
    } else {
      this.setState({
        passwordConfirm: false,
      });
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Signup Details - ");
    console.log("Name: " + this.state.name);
    console.log("Email: " + this.state.email);
    console.log("Password: " + this.state.password);
    try {
      axios
        .post("users/register", {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })
        .then((response) => {
          console.log(response.data);

          if (response.data === "Success: Registration successful") {
            console.log("Registered");

            this.props.history.push(`/login`);
            this.setState({ registered: true });
          } else if (response.data === "Error: User already exists") {
            let arr = [];
            arr.push(response.data);

            this.setState({
              errors: arr,
            });

            // TODO : Give the users some message //
          }
        });
    } catch (e) {
      console.log("Error in Signup");
      console.log(e);
    }
  };
  render() {
    return (
      <div className="d-md-flex h-md-100 align-items-left">
        <Admin1></Admin1>

        <div className="col-md-6 p-0 bg-pink h-md-100 loginarea">
          <div className="d-md-flex align-items-left h-md-100 p-5 justify-content">
            <form onSubmit={this.handleSubmit}>
              <h1 className="mb-4 mx-4 p-5 text-white">Sign Up</h1>

              <div className="mx-4 my-4 form-group">
                <label className="text-white">Name:</label>
                <input
                  type="name"
                  id="name"
                  className="form-control"
                  onChange={this.handleName}
                  required
                />
              </div>

              <div className=" mx-4 my-4 form-group">
                <label className="text-white">Email Id:</label>
                <input
                  type="email"
                  id="name"
                  className="form-control"
                  onChange={this.handleEmail}
                  required
                />
              </div>

              <div className="mx-4 my-4 form-group">
                <label className="text-white">Phone Number:</label>
              </div>

              <ReactTelInput
                defaultCountry="in"
                flagsImagePath="flags"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />

              <div className="mx-4 my-4 form-group">
                <label className="text-white">Password:</label>
                <input
                  type="password"
                  id="name"
                  className="form-control"
                  onChange={this.handlePassword}
                  required
                />
                <small className="form-text text-muted-white">
                  Your password must be 8-20 characters long, contain letters,
                  numbers and special characters, but must not contain spaces.
                </small>
              </div>

              <button type="submit" className="btn bg-white float-right cus"
										onSubmit={this.handleSubmit}>
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
