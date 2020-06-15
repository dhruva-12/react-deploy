import React, { Component } from "react";
import Navbar2 from "./../components/Navbar1/Navbar2/Navbar2";
import SideMenu from "./../components/Profile/SideMenu";
import UserData from "./../components/Profile/UserData";
import BookingHistory from "./../components/Profile/BookingHistory"
import TransactionHistory from "./../components/Profile/TransactionHistory"
import "./Profile.css";
export default class Profile extends Component {
	constructor(props) {
		super(props)
		if (!localStorage.usertoken) {
			this.props.history.push(`/`);
		}
		this.state = {
			selectedOption: "profile",
		}
	}

	handleSelection = name => {
		this.setState({
			selectedOption: name
		})
	}

	render = () => {

		let selectedOption = <UserData />

		if(this.state.selectedOption === "profile") {
			selectedOption = <UserData />
		} else if (this.state.selectedOption === "booking") {
			selectedOption = <BookingHistory />
		} else if (this.state.selectedOption === "transaction") {
			selectedOption = <TransactionHistory />
		}


		return (
			<div className="ccontainer">
				<Navbar2 source="profile" />
				<div style={{ height: 65 }} />
				<div className="flewRow">
					<SideMenu handleSelection={this.handleSelection} />
					{selectedOption}
					{/* <TransactionHistory /> */}
				</div>
			</div>
		);
	};
}
