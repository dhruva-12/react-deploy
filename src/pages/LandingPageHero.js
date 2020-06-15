import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./LandingPage.css";
import LPImage from "../components/LPImage";
// import { DatePicker, Select } from "antd";

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
// const { RangePicker } = DatePicker;
// const { Option } = Select;

const asyncLocalStorage = {
	setItem: async function(key, value) {
		await null;
		return localStorage.setItem(key, value);
	},
	getItem: async function(key) {
		await null;
		return localStorage.getItem(key);
	}
};

export default class LandingPageHero extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: "",
			startDate: "",
			endDate: "",
			toDashboard: false
		};
	}

	getDate(offset) {
		let d = new Date();
		d.setDate(d.getDate() + offset); //adds/subtracts days
		let month = "" + (d.getMonth() + 1);
		let day = "" + d.getDate();
		let year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		console.log(year, month, day);

		return [year, month, day].join("-");
	}

	handlePopularDestinations = placeName => {
		console.log("Here");
		console.log(placeName);
		let currentDate = this.getDate(0);
		let futureDate = this.getDate(7);

		localStorage.setItem("place", placeName);
		localStorage.setItem("Start", currentDate);
		localStorage.setItem("End", futureDate);

		// tried all these but none seem to work

		// this.props.data.chickData();
		//await timeout(2000)
		// this.props.data.chickData();
		this.setState({ toDashboard: true });
	};

	render = () => {
		console.log("landingpagemore");

		if (this.state.toDashboard === true) {
			// window.location.reload();
			return <Redirect to="/Rooms" />;
		}

		return (
			<React.Fragment>
				<div
					style={{
						width: "100vw",
						textAlign: "center",
						margin: "2rem auto"
					}}
				>
					<span className="LPDiscoveryHeading">
						Most Popular Destinations
					</span>
				</div>

				<div className="LPRow" style={{ height: "25vh" }}>
					<LPImage
						url={des1}
						text="Pune"
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des2}
						text="Kota Bharu"
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des3}
						text="Johor Bahru"
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des4}
						text="Semporna"
						handleClick={this.handlePopularDestinations}
					/>
				</div>
				<div className="LPRow" style={{ height: "25vh" }}>
					<LPImage
						url={des5}
						text="Alor Setar"
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des6}
						text="Putrajaya"
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des7}
						text="Pune"
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des8}
						text="Agra"
						handleClick={this.handlePopularDestinations}
					/>
				</div>
				<div className="LPRow" style={{ height: "25vh" }}>
					<LPImage
						url={des9}
						text=""
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des10}
						text=""
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des11}
						text=""
						handleClick={this.handlePopularDestinations}
					/>
					<LPImage
						url={des12}
						text=""
						handleClick={this.handlePopularDestinations}
					/>
				</div>

				{/* </div> */}

				<div className="LPFooter">.</div>
			</React.Fragment>
		);
	};
}
