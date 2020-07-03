import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import ReactTelInput from "react-telephone-input";
import "./Admin.css";

import axios from "axios";
import { MDBAlert } from "mdbreact";


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
export default class Admin1 extends Component {

    constructor(props) {
		super(props);

		if (localStorage.usertoken) {
			this.props.history.push(`/`);
		}
		this.state = {
			email: "",
			password: "",
			errors: []
		};
	}

	handleEmail = event => {
		this.setState({
			email: event.target.value
		});
	};

	handlePassword = event => {
		this.setState({
			password: event.target.value
		});
	};

	handleSubmit = event => {
        event.preventDefault();
        try {
			axios
				.post("users/login", {
					email: this.state.email,
					password: this.state.password
				})
				.then(response => {
					console.log("ress - " + response.message);

					if (response.data === "Error: Wrong Email/Password") {
						console.log("Login failed");
						let arr = [];
						arr.push(response.data);

						this.setState({
							errors: arr
						});
					} else if (response.data) {
						console.log(response.data.message);
						localStorage.setItem("usertoken", response.data.token);
						this.props.history.push(`/`);
					}
				})
				.catch(err => {
					console.log(err);
				});
		} catch (e) {
			console.log("Error in Login");
			console.log(e);
		}
	};


  
  render() {

    const responseFacebook = (response) => {
        console.log(response);
      }
  
      const responseGoogle = (response) => {
        console.log(response);
      }
      
		let success = false;

		//if (this.props.location.state && this.props.location.state.success) {
		//	success = true;
		//}

		const successMessage = (
			<MDBAlert color="success">Registration successful</MDBAlert>
		);

		const err = (
			<MDBAlert color="danger">
				{this.state.errors.map((error, i) => (
					<p key={i}>{error}</p>
				))}
			</MDBAlert>
		);
    return (


    <>
        <div className="col-md-6 p-0 bg-white h-md-100  ">
          <div className="d-md-flex align-items-left h-100 p-5 text-left justify-content-left">
          {success && successMessage}
						{this.state.errors.length !== 0 ? (
							err
						) : (
							<div style={{ height: "5vh" }} />
						)}
            <form>
              <div>
                <img
                  src="https://www.visitorsdeals.com/static/media/logo-full.a4ea859c.png"
                  className="img-fluid mt-1 ml-2 mb-1 w-25"
                  alt="Logo"
                />
                 <br></br>
                <br></br>
                <br></br>

                <h1 className="mb-4 text-pink mx-5">Log In</h1>
              </div>

              <br></br>
              <br></br>

              <div className=" mx-4 my-4 form-group">
                <label className="text-pink">Email Id:</label>
                <input type="email" id="name1" className="form-control" onChange={this.handleEmail} />
              </div>

              <div className="mx-4 my-4 form-group">
                <label className="text-pink">Password:</label>
                <input type="password" id="name1" className="form-control" onChange={this.handlePassword}/>
                <small className="form-text text-muted-white">
                  Your password must be 8-20 characters long, contain letters,
                  numbers and special characters, but must not contain spaces.
                </small>
              </div>
              <br></br>
              <br></br>
              <button type="button" className="btn bg-pink float-right cus1" onClick={this.handleSubmit}>
                LOG IN
              </button>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <button className="loginBtn loginBtn--facebook"  appId="1088597931155576"
              callback={responseFacebook}>
                Login with Facebook
              </button>

              <button className="loginBtn loginBtn--google" 
              clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
               onSuccess={responseGoogle}
               onFailure={responseGoogle}
               cookiePolicy={'single_host_origin'}
                >
                Login with Google
              </button>
            </form>
          </div>
        </div>
        <div className="mx -auto or">OR</div>

        </>
      
    );
  }
}
