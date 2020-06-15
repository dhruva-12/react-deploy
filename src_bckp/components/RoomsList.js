import React, { Component } from "react";
import Room from "./Room";
import { DatePicker, Select } from "antd";
import { render } from "@testing-library/react";
import { Redirect } from "react-router-dom";
import { Icon } from "antd";
import Context from "../Context";
import RoomUI from "./RoomUI";
import "./RoomUI.css";
import "../pages/LandingPage.css";
import OrangeSearchBar from "../components/OrangeSearchBar";
import Navbar2 from "./Navbar1/Navbar2/Navbar2";
const { RangePicker } = DatePicker;

class RoomsList extends Component {
	state = {
		place: "",
		startDate: "",
		endDate: "",
		toDashboard: false,
		capacity: "1"
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

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

	handleSelect = value => {
		this.setState({
			capacity: value
		});
	};

	handleChangeStartDate = (date, dateString) => {
		this.setState({
			startDate: dateString
		});
	};

	handleChangeEndDate = (date, dateString) => {
		this.setState({
			endDate: dateString
		});
	};

	sendData = () => {
		localStorage.setItem("place", this.state.place);
		localStorage.setItem("Start", this.state.startDate);
		localStorage.setItem("End", this.state.endDate);
		this.setState({ toDashboard: true });
		console.log("gereee");

		console.log(this.state.place);
		console.log(this.state.startDate);
		console.log(this.state.endDate);
	};

	render() {
		console.log("this.props.rooms.length", this.props.statusValue);

		if (this.props.rooms.length === 0) {
			return (
				<div className="empty-search">
					<h3>
						unfortunately no rooms matched your search parameters
					</h3>
				</div>
			);
		}

		if (this.state.toDashboard === true) {
			window.location.reload();
			return <Redirect to="/Rooms" />;
		}

		return (
			<div>
				{/* <Navbar2 source="rooms" /> */}
				<section className="roomslist">
					<OrangeSearchBar
						handleChange={this.handleChange}
						handleChangeStartDate={this.handleChangeStartDate}
						handleChangeEndDate={this.handleChangeEndDate}
						handleSelect={this.handleSelect}
						sendData={this.sendData}
					/>

					<div className="roomUIList">
						{this.props.rooms.map(item => {
							//return <Room key={item.id} room={item} />;
							return <RoomUI key={item.id} room={item} />;
						})}
					</div>
				</section>
			</div>
		);
	}
}

export default RoomsList;
