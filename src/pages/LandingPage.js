import React, { Component } from "react";
import "./LandingPage.css";
import { Link, Redirect } from "react-router-dom";
import {Spring} from 'react-spring/renderprops'
import TransitionMenu from '../components/MobilePopupMenu/transition-menu';
import Overlay from "../components/MobilePopupMenu/overlay";


import LPImage from "../components/LPImage";
import { DatePicker, Select, Checkbox } from "antd";
import { Icon } from 'antd';
import './LandingPage.css'
import Footer from './Footer'
import OrangeSearchBar from './../components/OrangeSearchBar'
import Autocomplete from "./../components/autoCompleate/Autocomplete";

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
const { Option } = Select;



export default class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: "",
			startDate: "",
			endDate: "",
			toDashboard: false,
			capacity: "1",
			menuPressed: false,

		};
		
	}


	handleChange = (event, otherVal) => {        
		this.setState({
			[event.target.name]: otherVal!==undefined ? otherVal : event.target.value
		});
	};
	handleClickPlace = (event, otherVal) => {        
		this.setState({
			"place": otherVal!==undefined ? otherVal : event.target.value
		});
	};
	

	handleChangeDate = (date, dateString) => {
		let startDate = dateString[0];
		let endDate = dateString[1];
		console.log(dateString)
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
			startDate: dateString,
		})
	}

	handleChangeEndDate = (date, dateString) => {
		this.setState({
			endDate: dateString,
		})
	}

	sendData = async (place) => {
		let currentDate 
		let futureDate
		if (!this.state.startDate && !this.state.endDate) {
			currentDate = this.getDate(0);
			futureDate = this.getDate(7);
			console.log("date", currentDate, futureDate)
			this.setState({
				startDate: currentDate,
				endDate: futureDate,
			})

		}

		let occupancies = [{
			numOfAdults: Number(this.state.capacity),
			childAges: []
		}
		
	]
		this.props.history.push({
			pathname: '/rooms',
				state: {
					place: this.state.place || place,
					startDate: this.state.startDate || currentDate,
					endDate: this.state.endDate || futureDate,
					occupancies: occupancies,

				}
		  });
		
	};

	getDate(offset) {
		let d = new Date();
		d.setDate(d.getDate() + offset); //adds/subtracts days
		let month = "" + (d.getMonth() + 1);
		let day = "" + d.getDate();
		let year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}

	handlePopularDestinations = async placeName => {
		let currentDate = this.getDate(0);
		let futureDate = this.getDate(7);

		this.setState({
			place: placeName,
			startDate: currentDate,
			endDate:futureDate,
		})
		this.setState({ toDashboard: true });
		
		
	};

	handleMenuClick = () => {
		this.setState({
			menuPressed: !this.state.menuPressed,
		})
	}

	setCurrency = ( newCurrency ) => { 
		this.setState({ currency: newCurrency })
		localStorage.setItem("currency", newCurrency)
	}

	render = () => {

	
		return (
			<React.Fragment>

				{/* Desktop search bar */}
				<div className="LPSearchContainer">
					<div className="LPSearch">
						<div className="LPnavbar">
						<div className="logoLP" />
							<Link
								to="/Admin"
								className="LPLink"
								style={{ marginRight: "10vw" }}
							>
								Sign In/Sign up
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

						<div className="LPSearchcenter">
							{/* <input
								type="text"
								className="LPSearchbar"
								placeholder="Destination"
								name="place"
								onChange={this.handleChange}
							/> */}
							<Autocomplete
								suggestions={[
								"Pune",
								"Satara",
								"Bhor",
								"Chiplun",
								"Solapur",
								"Mumbai",
								"Nagpur",
								"Tamilnadu",
								"Banglore",
								"Kolkata"
								]}							
								triggerParentLocation={this.handleChange}
								triggerParentLocationClick={this.handleClickPlace}
							/>
							<RangePicker
								style={{ marginRight: "0rem" }}
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
					</div>
				</div>


				<div className="LPMobile">
				<Overlay onClick={this.handleMenuClick} open={this.state.menuPressed} />
				<TransitionMenu 
					onClick={this.handleMenuClick} 
					open={this.state.menuPressed} 
					currency={this.state.currency} 
					setCurrency={this.setCurrency}
				/>

					<div className="LPnavbar" >
						<div className="logoLP" />
						<Link
							to="/Admin"
							className="LPLink"
							style={{ marginRight: "10vw" }}
						>
							Sign In/Sign up
						</Link>
					</div>

					<div
						style={{
							// margin: "2rem 0",
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
						history={this.props.history}
					/>


					<div className="orangeSearchMenu" >
						<Icon type="menu" style={{cursor: "pointer"}} onClick={this.handleMenuClick}/>
					</div>



				</div>


				<div className="LPPopularDestinations">
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

				<div style={{ width: "100vw", height: "auto", margin: "0 auto" }}>
					<div className="LPRow">
						<LPImage url={des1} text="George Town" handleClick={this.sendData} />
						<LPImage url={des2} text="Kota Bharu" handleClick={this.sendData}/>
						<LPImage url={des3} text="Johor Bahru" handleClick={this.sendData} />
						<LPImage url={des4} text="Semporna" handleClick={this.sendData} />
						<LPImage url={des5} text="Alor Setar" handleClick={this.sendData} />
						<LPImage url={des6} text="Putrajaya" handleClick={this.sendData} />
						<LPImage url={des7} text="Pune" handleClick={this.sendData} />
						<LPImage url={des8} text="Agra" handleClick={this.sendData} />
						<LPImage url={des9} text="Bangalore" handleClick={this.sendData}/>
						<LPImage url={des10} text="Bhopal" handleClick={this.sendData}/>
						<LPImage url={des11} text="Kochi" handleClick={this.sendData}/>
						<LPImage url={des12} text="Mangalore" handleClick={this.sendData}/>
					</div>
				</div>

				

				<Footer />
				</div>
			</React.Fragment>
		);
	};
}
