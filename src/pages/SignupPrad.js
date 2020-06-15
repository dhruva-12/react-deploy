import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./SignupPrad.css";
import axios from "axios";
import { MDBAlert } from "mdbreact";

import Navbar2 from "../components/Navbar1/Navbar2/Navbar2";
import PasswordStrengthMeter from "../components/passwordStrength/PasswordStrengthMeter";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


class SignupPrad extends Component {
	constructor(props) {
		super(props);
		if (localStorage.usertoken) {
			this.props.history.push(`/`);
		}

		this.state = {
			name: "",
			email: "",
			password: "",
			passwordConfirm:true,
			errors: [],
			registered: false
		};
	}

	handleName = event => {
		this.setState({
			name: event.target.value
		});
	};

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

	handlePasswordConfirm = event => {
		if(event.target.value === this.state.password) {
			this.setState({
				passwordConfirm: true
			});
		}else {
			this.setState({
				passwordConfirm: false
			});
		}
	}

	handleSubmit = event => {
		event.preventDefault();
		console.log("Signup Details - ");
		console.log("Name: " + this.state.name);
		console.log("Email: " + this.state.email);
		console.log("Password: " + this.state.password);	
		// ---------------------------------
		// this.props.history.push(`/login`);	
		// ---------------------------------
		try {
			axios
				.post("users/register", {
					name: this.state.name,
					email: this.state.email,
					password: this.state.password
				})
				.then(response => {
					console.log(response.data);

					if (response.data === "Success: Registration successful") {
						console.log("Registered");

						this.props.history.push(`/login`)
						this.setState({ registered: true });
					} else if (response.data === "Error: User already exists") {
						let arr = [];
						arr.push(response.data);

						this.setState({
							errors: arr
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

		// ------------------- this code use for facebook and google login-------------------------
		const responseFacebook = (response) => {
			console.log(response);
		  }
	  
		  const responseGoogle = (response) => {
			console.log(response);
		  }
		//----------------------------------------------------------------------------------------

		const err = (
			<MDBAlert color="danger">
				{this.state.errors.map((error, i) => (
					<p key={i}>{error}</p>
				))}
			</MDBAlert>
		);

		if (this.state.registered) {
			return (
				<Redirect
					to={{
						pathname: "/login",
						state: {
							success: true
						}
					}}
				/>
			);
		} else {
			console.log("errors" + this.state.errors);
			return (
				<React.Fragment>
					<Navbar2 source="signup" />
					<div className="spacer" />

					<div className="main" style={{backgroundColor:'red'}}>
						<div className="detailsform" style={{backgroundColor:'red'}}>
							<div className="select">
								<Link
									to="/signup"
									style={{ textDecoration: "none" }}
								>
									<div className="topSignUpButton">
										Sign Up
									</div>
								</Link>
								<Link
									to="/login"
									style={{ textDecoration: "none" }}
								>
									<div className="topLoginButton">Log In</div>
								</Link>
							</div>

							<br />

							{this.state.errors.length !== 0 ? (
								err
							) : (
								<div style={{ height: "5vh" }} />
							)}

							<form onSubmit={this.handleSubmit}>
								<input
									className="inputBox"
									type="text"
									placeholder="Your Name"
									onChange={this.handleName}
									required
								/>
								<br />
								<br />
								<input
									className="inputBox"
									type="email"
									placeholder="Email"
									onChange={this.handleEmail}
									required
								/>
								<br />
								<br />
								<input
									className="inputBox"
									type="password"
									placeholder="Password"
									onChange={this.handlePassword}
									required
								/>
								<br />
								<PasswordStrengthMeter  password={this.state.password}/>
								
								<input
									className="inputBox"
									type="password"
									placeholder="Confirm Password"
									onChange={this.handlePasswordConfirm}
									required
								/>															
								<br />
								{this.state.passwordConfirm?
								<label></label>
								:
								<label style={{color:'red'}}>Password Not Match to Confirm password</label>}	
								<br />
								<div className="signupContainer">
									<button
										type="submit"
										onSubmit={this.handleSubmit}
										disabled={!this.state.passwordConfirm}
									>
										<div className="signupButton" style={{backgroundColor:'white',color:'red'}}>
											Sign Up
										</div>
									</button>
								</div>

								<br />
								<br />
								{/* ---------------------------------- */}
								{/* <div className="or">
                                    <div className="line" />
                                    <span>or connect with</span>
                                    <div className="line" />
                                </div> */}
								{/* --------------------------------- */}
							</form>
							 {/* ------------------- this code use for facebook and google login------------------------- */}
                            {/* <div className="connectWith">
                                <GoogleLogin
                                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                    // buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />

                                <FacebookLogin
                                    appId="1088597931155576"

                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                    // cssClass="my-facebook-button-class"
                                    icon="fa-facebook"
                                />

                            </div> */}
							 {/* ------------------- this code use for facebook and google login------------------------- */}
						</div>
					</div>
					{/* <FooterPage /> */}
				</React.Fragment>
			);
		}
	}
}

export default SignupPrad;
