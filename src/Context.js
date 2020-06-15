// import React, { Component } from "react";
// // import Navbar1 from "./components/Navbar1/Navbar1"
// // import LandingPage from "./pages/LandingPage"
// // import items from "./data";
// // import Client from "./Contentful.js";

// const RoomContext = React.createContext();

// function guid() {
// 	function s4() {
// 		return Math.floor((1 + Math.random()) * 0x10000)
// 			.toString(16)
// 			.substring(1);
// 	}
// 	return (
// 		s4() +
// 		s4() +
// 		"-" +
// 		s4() +
// 		"-" +
// 		s4() +
// 		"-" +
// 		s4() +
// 		"-" +
// 		s4() +
// 		s4() +
// 		s4()
// 	);
// }

// export default class RoomProvider extends Component {
// 	state = {
// 		rooms: [],
// 		sortedRooms: [],
// 		featuredRooms: [],
// 		loading: true,
// 		//
// 		type: "all",
// 		capacity: 1,
// 		price: 0,
// 		minPrice: 0,
// 		maxPrice: 0,
// 		minSize: 0,
// 		maxSize: 0,
// 		breakfast: false,
// 		wifi: false,
// 		restaurant: false,
// 		laundry: false,
// 		newSearch: true,
// 		statusValue : "P",
// 		rating : "",
// 		smallDescription : "",
// 		phoneNumber : ""

// 	};


// 	sendStatus = (token, guidData) => {
// 		console.log("sed Sataus")
// 		fetch(
// 		`https://nexus.dev-env.vervotech.com/api/hotel/availability/async/${token}/results`,
// 		{
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json; charset=utf-8",
// 				"Accept-Encoding": " gzip, deflate",
// 				"customer-ip": "49.37.192.210",
// 				correlationId: guidData,
// 				accountId: "demoAccount"
// 			}
// 		}
// 	).then(res => {
// 		res.json().then(data => {
// 			console.log(data);
// 			console.log("statusValue",this.state.statusValue)
// 			this.setState({statusValue : data.status})
// 		});
// 	});
// 	}
	

// 	getHotelData = () => {
// 		console.log(localStorage.getItem("place"));
// 		console.log(localStorage.getItem("Start"));
// 		console.log(localStorage.getItem("End"));
// 		var checkInDate = localStorage.getItem("Start")
// 		var checkOutDate = localStorage.getItem("End")
// 		var code = localStorage.getItem("LocalcountryCode")
// 		console.log(code)
// 		let rooms = [];

// 		let that = this;

// 		let temprooms = [];

// 		let place = localStorage.getItem("place");
// 		// place = "pune";
// 		// code = "IN"

// 		console.log("Context Js Page", place);

// 		fetch(
// 			`https://nexus.prod-env.vervotech.com/api/locations/locationcontent/autosuggest?term=${place}&countries=${code}`,
// 			{
// 				method: "GET"
// 			}
// 		).then(res => {
// 			res.json().then(place => {
// 				console.log(place.locationSuggestions[0].id);
// 				// response will be getting the subcoordinates of the search place with checkIn checkOut date
// 				fetch(
// 					`https://nexus.prod-env.vervotech.com/api/locations/locationcontent/location/${place.locationSuggestions[0].id}?getSublocations=true`,
// 					{
// 						method: "GET"
// 					}
// 				).then(function(response) {
// 					response.json().then(function(coordinates) {
// 						console.log(coordinates.boundaries);
// 						console.log(coordinates.boundaries[0].slice(0, 10));
// 						var opts = {
// 							channelId: "demoChannel",
// 							currency: "INR",
// 							culture: "en-US",
// 							checkIn: checkInDate,
// 							checkOut: checkOutDate,
// 							occupancies: [
// 								{
// 									numOfAdults: 5,
// 									childAges: []
// 								}
// 							],
// 							nationality: "IN",
// 							countryOfResidence: "IN",
// 							multiPolygonalRegion: {
// 								polygons: [
// 									{
// 										coordinates: coordinates.boundaries[0],
// 										id: null
// 									}
// 								]
// 							},
// 							filterBy: {
// 								ratings: {
// 									min: 0,
// 									max: 5
// 								}
// 							},
// 							destinationCountryCode: "AE"
// 						};

// 						console.log(opts);

// 						var guidData = guid();

// 						//  for hotel detail it will genrate one token

// 						fetch(
// 							"https://nexus.dev-env.vervotech.com/api/hotel/availability/init",
// 							{
// 								method: "POST",
// 								body: JSON.stringify(opts),
// 								headers: {
// 									"Content-Type": "application/json; charset=utf-8",
// 									"Accept-Encoding": " gzip, deflate",
// 									"customer-ip": "49.37.192.210",
// 									correlationId: guidData,
// 									accountId: "demoAccount"
// 								}
// 							}
// 						).then(function(response) {
// 							response.json().then(function(responseToken) {
// 								console.log("respose", responseToken);
// 								console.log("guidData", guidData);

// 								fetch(
// 									`https://nexus.dev-env.vervotech.com/api/hotel/availability/async/${responseToken.token}/results`,
// 									{
// 										method: "GET",
// 										headers: {
// 											"Content-Type":
// 												"application/json; charset=utf-8",
// 											"Accept-Encoding": " gzip, deflate",
// 											"customer-ip": "49.37.192.210",
// 											correlationId: guidData,
// 											accountId: "demoAccount"
// 										}
// 									}
// 								).then(res => {
// 									res.json().then(data => {
// 										console.log(data);
// 										// while (true) {
// 										// 	console.log("statusValue",that.state.statusValue)
// 										// 	if(that.state.statusValue !== "Completed"){
// 										// 		that.sendStatus(responseToken.token,guidData)
// 										// 	}
// 										// 	else{
// 										// 		break;
// 										// 	}
// 										// }
// 									});
// 								});

// 								// const promise = new Promise((resolve, reject) => {
// 									setTimeout(() => {
// 										//  resposne token will be send to this api (response (ID and Price , i am taking from here))
// 										fetch(
// 											`https://nexus.dev-env.vervotech.com/api/hotel/availability/async/${responseToken.token}/results`,
// 											{
// 												method: "GET",
// 												headers: {
// 													"Content-Type":
// 														"application/json; charset=utf-8",
// 													"Accept-Encoding": " gzip, deflate",
// 													"customer-ip": "49.37.192.210",
// 													correlationId: guidData,
// 													accountId: "demoAccount"
// 												}
// 											}
// 										).then(res => {
// 											res.json().then(data => {
// 												var roomid = data.hotels.map(elem => {
// 													return elem.id;
// 												});
// 												var price = data.hotels.map(elem => {
// 													return elem.rate.totalRate;
// 												});
// 												console.log(roomid, price);


// 												// stored (IDs of hotel i am passing here to get all the details for hotels)

// 												fetch(
// 													"https://nexus.dev-env.vervotech.com/api/content/hotelcontent/getHotelContent",
// 													{
// 														method: "POST",
// 														body: JSON.stringify({
// 															channelId: "demoChannel",
// 															culture: "en-US",
// 															hotelIds: roomid,
// 															contentFields: ["All"],
// 															providerPrefs: []
// 														}),
// 														headers: {
// 															"Content-Type":
// 																"application/json; charset=utf-8",
// 															"Accept-Encoding": " gzip, deflate",
// 															"customer-ip": "",
// 															correlationId:
// 																"764388c8-123d-1279-1f3e-587d9250f95c",
// 															accountId: "demoAccount"
// 														}
// 													}
// 												).then(function(response) {
// 													response.json().then(function(hoteldata) {
// 														console.log(hoteldata);
// 														price.forEach(element => {
															
// 														});
// 														temprooms = hoteldata.hotels.map(elem => {
// 															let room = {
// 																id: elem.id,
// 																name: elem.name,
// 																slug: elem.id,
// 																type: elem.type,
// 																// price: element,
// 																size: 250,
// 																capacity: 1,
// 																wifi: elem.facilities.some(element => element.groupId === "16"),
// 																breakfast: elem.facilities.some(element => element.groupId === "5"),
// 																restaurant: elem.facilities.some(element => element.groupId === "14"),
// 																laundry: elem.facilities.some(element => element.groupId === "12"),
// 																fearured: false,
// 																images: elem.images.map(elem => {
// 																	return elem.links[0].url;
// 																}),
// 																rating: elem.starRating,
// 																smallDescription : elem.descriptions.length > 1 ? elem.descriptions[0].text + elem.descriptions[1].text : "",
													
// 																phoneNumber : elem.contact ? elem.contact.phones : "" ,
// 																description: elem.descriptions
// 																	.map(elem => {
// 																		return elem.text;
// 																	})
// 																	.join(""),
// 																extras: elem.facilities.map(elem => {
// 																	return elem.name;
// 																})
// 															};
// 															return room;
// 														});

// 														//  above json will bind data without price


// 														for(let i = 0; i < temprooms.length;i++){
// 															temprooms[i]['price'] = price[i]
// 														}

// 														// after the the for loop price will be added 

// 														console.log(temprooms)

// 														rooms = temprooms;
// 												let featuredRooms = rooms.filter(
// 													room => room.featured === true
// 												);
// 												//
// 												let maxPrice = Math.max(
// 													...rooms.map(item => item.price)
// 												);
// 												let maxSize = Math.max(
// 													...rooms.map(item => item.size)
// 												);
// 												that.setState({
// 													rooms,
// 													featuredRooms,
// 													sortedRooms: rooms,
// 													loading: false,
// 													//
// 													price: maxPrice,
// 													maxPrice,
// 													maxSize
// 												});
														
														
// 													});
// 												});
// 											});
// 										});
// 									}, 4000);
// 								// });
// 							});
// 						});
// 					});
// 				});
// 			});
// 		});
// 	};

// 	chickData = () => {
// 		console.log("COmes Here in context")
// 	}

// 	getRoom = slug => {
// 		let tempRooms = [...this.state.rooms];
// 		const room = tempRooms.find(room => room.slug === slug);
// 		return room;
// 	};
// 	handleChange = event => {
// 		const target = event.target;
// 		const value =
// 			target.type === "checkbox" ? target.checked : target.value;
// 		const name = target.name;
// 		console.log(name, value);

// 		this.setState(
// 			{
// 				[name]: value
// 			},
// 			this.filterRooms
// 		);
// 	};
// 	filterRooms = () => {
// 		let {
// 			rooms,
// 			type,
// 			capacity,
// 			price,
// 			minSize,
// 			maxSize,
// 			breakfast,
// 			wifi,
// 			restaurant,
// 			laundry,
// 			newSearch
// 		} = this.state;

// 		let tempRooms = [...rooms];
// 		// transform values
// 		// get capacity
// 		capacity = parseInt(capacity);
// 		price = parseInt(price);
// 		// filter by type
// 		if (type !== "all") {
// 			tempRooms = tempRooms.filter(room => room.type === type);
// 		}
// 		// filter by capacity
// 		if (capacity !== 1) {
// 			tempRooms = tempRooms.filter(room => room.capacity >= capacity);
// 		}
// 		// filter by price
// 		tempRooms = tempRooms.filter(room => room.price <= price);
// 		//filter by size
// 		tempRooms = tempRooms.filter(
// 			room => room.size >= minSize && room.size <= maxSize
// 		);
// 		//filter by breakfast
// 		if (breakfast) {
// 			tempRooms = tempRooms.filter(room => room.breakfast === true);
// 		}
// 		//filter by wifi
// 		if (wifi) {
// 			tempRooms = tempRooms.filter(room => room.wifi === true);
// 		}
// 		//filter by restaurant
// 		if (restaurant) {
// 			tempRooms = tempRooms.filter(room => room.restaurant === true);
// 		}
// 		//filter by laundry
// 		if (laundry) {
// 			tempRooms = tempRooms.filter(room => room.laundry === true);
// 		}
// 		this.setState({
// 			sortedRooms: tempRooms
// 		});
// 	};
// 	render() {

// 		console.log("comes here");
// 		console.log("data",this.state.rooms);
// 		if (localStorage.getItem("place") !== null && this.state.rooms.length === 0) {
// 			this.getHotelData();
// 			// localStorage.removeItem("place");
// 		}

		

// 		return (
// 			<div>
// 			<RoomContext.Provider
// 				value={{
// 					...this.state,
// 					getRoom: this.getRoom,
// 					handleChange: this.handleChange
// 				}}
// 			>
// 				{this.props.children}
// 			</RoomContext.Provider>
// 			{/* <Navbar1 data = {{chickData: this.chickData.bind(this)}} /> */}
// 			{/* <LandingPage data = {{chickData: this.chickData.bind(this)}} /> */}
// 			</div>
// 		);
// 	}
// }
// const RoomConsumer = RoomContext.Consumer;

// export { RoomProvider, RoomConsumer, RoomContext };

// export function withRoomConsumer(Component) {
// 	return function ConsumerWrapper(props) {
// 		return (
// 			<RoomConsumer>
// 				{value => <Component {...props} context={value} />}
// 			</RoomConsumer>
// 		);
// 	};
// }
