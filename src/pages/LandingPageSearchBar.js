import React, { Component } from "react";
import "./LandingPage.css";
import { Link, Redirect } from "react-router-dom";
import LPImage from "../components/LPImage";
import { DatePicker } from "antd";

import des1 from "./../images/Landing Page/des1.jpg";
import des2 from "./../images/Landing Page/des2.jpg";
import des3 from "./../images/Landing Page/des3.jpg";
import des4 from "./../images/Landing Page/des4.jpg";
import des5 from "./../images/Landing Page/des5.jpg";
import des6 from "./../images/Landing Page/des6.jpg";
import des7 from "./../images/Landing Page/des7.jpg";
import des8 from "./../images/Landing Page/des8.jpg";
import des9 from "./../images/Landing Page/des9.jpg";
import des10 from "./../images/Landing Page/des10.jpg";
import des11 from "./../images/Landing Page/des11.jpg";
import des12 from "./../images/Landing Page/des12.jpg";

const { RangePicker } = DatePicker;
// const { Option } = Select;
export default class LandingPageSearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: "",
			startDate: "",
			endDate: "",
			toDashboard: false
		};
	}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleChangeDate = (date, dateString) => {
		let startDate = date[0];
		let endDate = date[1];
		this.setState({
			startDate,
			endDate
		});
	};

	sendData = () => {
		localStorage.setItem("place", this.state.place);
		localStorage.setItem("Start", this.state.startDate);
		localStorage.setItem("End", this.state.endDate);
		// this.props.data.chickData();
		this.setState({ toDashboard: true });

		console.log(
			this.state.place + this.state.startDate + this.state.endDate
		);
	};

	render = () => {
		return (
			<React.Fragment>
				<div className="LPSearchContainer">
					<div className="LPSearch">
						<div className="LPDiscover">
							<span
								style={{
									textAlign: "center",
									fontSize: "4rem",
									fontWeight: "bolder"
								}}
							></span>
						</div>
						<div className="LPSearchcenter">
							<input
								type="text"
								className="LPSearchbar"
								placeholder="Planning a trip? Choose a country"
								name="place"
								onChange={this.handleChange}
							/>
							<RangePicker
								style={{ marginRight: "1rem" }}
								onChange={this.handleChangeDate}
							/>
							<button
								className="LPSearchButton"
								onClick={this.sendData}
							>
								Search
							</button>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	};
}
