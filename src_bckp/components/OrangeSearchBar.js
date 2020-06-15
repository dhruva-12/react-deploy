import React, {Component} from "react";

import { DatePicker, Select, Checkbox } from "antd";
import { Icon } from 'antd';
import '../pages/LandingPage.css'
import moment from 'moment';

const { Option } = Select;

export default class OrangeSearchBar extends Component {

    constructor(props){
        super(props)
        this.state={
            
            place: props.place,
			startDate: props.startDate || "",
			endDate: props.endDate || "",
            capacity: props.capacity || "1",


        }
        
    }

    // componentDidMount(){
    //     if(this.props.reset){
    //         this.setState({
    //             startDate: '',
    //             endDate: ''
    //         })
    //     }
    // }
    disableStartDate = current => {
        let end = moment(this.state.endDate)
        if(!this.props.reset && end.isValid()){
            return current < moment().startOf("day") || current > end;
        }

        return current < moment().startOf("day") 
    }

    disableEndDate = current => {
        let start = moment(this.state.startDate)
        if(!this.props.reset && start.isValid()){
            return current < start.endOf("day")
        }

        return current < moment().startOf("day") 
    }

    handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
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
        console.log("setdate")
		this.setState({
			startDate: dateString,

		})
	}

	handleChangeEndDate = (date, dateString) => {
		this.setState({
			endDate: dateString,

		})
	}

	sendData = async () => {
		if (!this.state.startDate && !this.state.endDate) {
			let currentDate = this.getDate(0);
			let futureDate = this.getDate(7);

			this.setState({
				startDate: currentDate,
				endDate: futureDate,
			})

		}
		// this.setState({ toDashboard: true });
		let occupancies = [{
			numOfAdults: Number(this.state.capacity),
			childAges: []
        }]
        
		this.props.history.push({
			pathname: '/rooms',
				state: {
					place: this.state.place,
					startDate: this.state.startDate,
					endDate: this.state.endDate,
			
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


    render() {
        return (

            <div className="orangeSearch" style={{ backgroundColor: this.props.backgroundColor, top: this.props.top }}>

                {/* <div className="whatAreYouLookingFor">
                <Icon type="search" style={{ fontSize: "2rem", fontWeight: "bold", marginRight: "auto" }} />
                What are you looking for?
                    </div> */}

                <div style={{ fontSize: "2rem", color: "white", padding: "2rem 0", width: "90%", margin: "0 auto" }}>
                    Search
                    </div>

                {/* <div style={{ color: "white", width: "90%", margin: "0 auto" }}>
                Destination/property name:
                    </div> */}

                {/* <div style={{margin:"1rem", display:"flex", alignContent:"center", justifyContent:"center", width}}> */}
                <input type="text"
                    className="orangeSearchbar"
                    placeholder="Destination name"
                    name="place"
                    onChange={this.handleChange}
                    value={this.state.place}
                />


                {/* </div> */}




                {/* <div style={{ color: "white", width: "90%", margin: "0 auto" }}>
                Check-In Date:
                    </div> */}



                <DatePicker
                    className="orangeSearchInput"
                    onChange={this.handleChangeStartDate}
                    placeholder="Check-In Date"
                    value={(moment(this.state.startDate, 'YYYY/MM/DD').isValid())?(moment(this.state.startDate, 'YYYY/MM/DD')): ""}
                    disabledDate={this.disableStartDate}
                    showToday={false}
                />

                {/* 
            <div style={{ color: "white", width: "90%", margin: "0 auto" }}>
                Check-Out Date:
                    </div> */}
                <DatePicker
                    className="orangeSearchInput"
                    onChange={this.handleChangeEndDate}
                    placeholder="Check-Out Date"
                    value={(moment(this.state.endDate, 'YYYY/MM/DD').isValid())?(moment(this.state.endDate, 'YYYY/MM/DD')): ""}
                    disabledDate={this.disableEndDate}
                    showToday={false}

                />

                <div className="orangeSearchInput" style={{ color: "white" }}>
                    {(moment(this.state.startDate).isValid() && 
                     moment(this.state.endDate).isValid() && 
                     moment(this.state.endDate).diff(moment(this.state.startDate))>0) &&
                     moment(this.state.endDate).diff(moment(this.state.startDate), 'day')+ " night stay"} 
                    </div>
                <Select defaultValue="1" name="capacity" onChange={this.handleSelect} className="orangeSearchInput">
                    <Option value="1">1 Adult</Option>
                    <Option value="2">2 Adults</Option>
                    <Option value="3">3 Adults</Option>
                    <Option value="4">4 Adults</Option>
                </Select>

                <div style={{ display: "flex" }}>
                    <Select defaultValue="No Child" className="orangeSearchInput" style={{ width: "40%" }} name="capacity" onChange={this.handleSelect}>
                        <Option value="0">No Child</Option>
                        <Option value="1">1 Child</Option>
                        <Option value="2">2 Children</Option>
                        <Option value="3">3 Children</Option>
                    </Select>

                    <Select defaultValue="1 Room" className="orangeSearchInput" style={{ width: "40%" }} name="capacity" onChange={this.handleSelect}>
                        <Option value="1">1 Room</Option>
                        <Option value="2">2 Rooms</Option>
                        <Option value="3">3 Rooms</Option>
                    </Select>



                </div>

                {/* <Checkbox className="orangeSearchInput" style={{ color: "white", marginTop: "1rem" }}>I'm travelling for work</Checkbox> */}


                <div className="orangeSearchbarSearchButton">
                    <button className="LPSearchButton" style={{ backgroundColor: '#0076cd', margin: "2rem 0", borderRadius: "1rem" }} onClick={this.sendData}>Search</button>
                </div>



            </div>

        )
    }
}

