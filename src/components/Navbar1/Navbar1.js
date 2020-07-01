import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./Navbar1.css";
import LandingPage from "../../pages/LandingPage";
import "../../pages/LandingPage.css";
import OrangeSearchBar from "./../OrangeSearchBar";
// import { Link, Redirect } from "react-router-dom";
import LPImage from "../LPImage";
// import { FaBlackTie } from "react-icons/fa";
import { DatePicker, Select, Checkbox } from "antd";
import "antd/dist/antd.css";
// import Autocomplete from "react-google-autocomplete";

// import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import des1 from "../../images/Landing Page/des1.jpg";
import des2 from "../../images/Landing Page/des2.jpg";
import des3 from "../../images/Landing Page/des3.jpg";
import des4 from "../../images/Landing Page/des4.jpg";
import des5 from "../../images/Landing Page/des5.jpg";
import des6 from "../../images/Landing Page/des6.jpg";
import des7 from "../../images/Landing Page/des7.jpg";
import des8 from "../../images/Landing Page/des8.jpg";
import des9 from "../../images/Landing Page/des9.jpg";
import des10 from "../../images/Landing Page/des10.jpg";
import des11 from "../../images/Landing Page/des11.jpg";
import des12 from "../../images/Landing Page/des12.jpg";

import Footer from "../../pages/Footer";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default class Navbar1 extends Component {
	state = {
		StartDate: "",
		EndDate: "",
		address: "",
		countryCode: "",

		lat: null,
		long: null,
		toDashboard: false
	};

	onStartChange = (date, dateString) => {
		console.log(dateString);
		this.setState({ StartDate: dateString });
		// console.log(this.state.StartDate);
	};

	onEndChange = (date, dateString) => {
		console.log(dateString);
		this.setState({ EndDate: dateString });
		// console.log(this.state.EndDate);
	};

	handleChangeDate = (date, dateString) => {
		let startDate = dateString[0];
		let endDate = dateString[1];
		this.setState({
			StartDate: startDate,
			EndDate: endDate
		});
	};

	sendData = () => {
		localStorage.setItem("place", this.state.address);
		localStorage.setItem("Start", this.state.StartDate);
		localStorage.setItem("End", this.state.EndDate);
		localStorage.setItem("LocalcountryCode", this.state.countryCode);
		console.log(localStorage.getItem("LocalcountryCode"));
		// this.props.getHotelData();
		console.log("Saved");
		this.props.data.chickData();
		this.setState({ toDashboard: true });
	};

	page = () => {
		console.log("send some ");
		this.setState({ toDashboard: true });
		// return <Redirect exact to="/Rooms/" />;
	};

	handleChange = e => {
		console.log(e.target.value);

		this.setState({ address: e.target.value });
	};


	handleSelect = value => {
		this.setState({
			capacity: value
		});
	};

	setCountryCode = e => {
		// console.log(e.target.value);
		this.setState({ countryCode: e.target.value });

		localStorage.setItem("LocalcountryCode", this.state.countryCode);
		// console.log(localStorage.getItem("LocalcountryCode"));
	};

	render() {
		// console.log(this.state.address);
		if (this.state.toDashboard === true) {
			return <Redirect to="/Rooms" />;
		}
		return (
			

			<React.Fragment>
				<div className="LPSearchContainer">
					<div className="LPSearch">
						<div className="LPnavbar">
							<img className="logoLP" />
							<Link
								to="/Admin"
								className="LPLink"
								style={{ marginRight: "10vw" }}
							>
								Sign up
							</Link>
						</div>

						<div className="LPDiscover">
							<span
								style={{
									textAlign: "center",
									fontSize: "4rem",
									fontWeight: "bolder"
								}}
							></span>

							<span
								style={{
									textAlign: "center",
									fontSize: "3rem"
								}}
							>
								As you extend a mile on the beach shore,
							</span>
							<span
								style={{
									textAlign: "center",
									fontSize: "3rem"
								}}
							>
								you also extend the privilege to live better
							</span>
						</div>
						<form action="Rooms">
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

								<Select
									defaultValue="1"
									style={{ height: "5rem" }}
									name="capacity"
									onChange={this.handleSelect}
								>
									<Option value="1">1 Adult</Option>
									<Option value="2">2 Adults</Option>
									<Option value="3">3 Adults</Option>
									<Option value="4">4 Adults</Option>
								</Select>
								<button
									className="LPSearchButton"
									onClick={this.sendData}
								>
									Search
								</button>
							</div>
						</form>
					</div>
				</div>

				<div className="LPMobile">
					<div className="LPnavbar" style={{ marginBottom: "2rem" }}>
						<img className="logoLP" />
						<Link
							to="/Admin"
							className="LPLink"
							style={{ marginRight: "10vw" }}
						>
							Sign 
						</Link>
					</div>

					<div
						style={{
							margin: "2rem 0",
							display: "flex",
							flexDirection: "column"
						}}
					>
						<span
							style={{
								textAlign: "center",
								fontSize: "1.5rem",
								color: "white"
							}}
						>
							As you extend a mile on the beach shore,
						</span>
						<span
							style={{
								textAlign: "center",
								fontSize: "1.5rem",
								color: "white"
							}}
						>
							you also extend the privilege to live better
						</span>
					</div>

					<OrangeSearchBar
						handleChange={this.handleChange}
						handleChangeStartDate={this.handleChangeStartDate}
						handleChangeEndDate={this.handleChangeEndDate}
						handleSelect={this.handleSelect}
						sendData={this.sendData}
					/>
				</div>
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
						text="George Town"
						onClick={this.handlePopularDestinations}
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

				<Footer />
			</React.Fragment>
		);
	}
}
