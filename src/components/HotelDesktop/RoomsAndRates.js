import React, { Component } from 'react'
import { Spin, Button } from 'antd';
import Axios from 'axios'
import './RoomsAndRates.css'
import RoomPriceContainer from './RoomPriceContainer';
import Facilities from '../Facilities'

export default class RoomsAndRates extends Component {

    constructor(props){
        super(props)
        this.state = {
            loading: true,
            data: [],
            loadMore:true,
            selected: "",
        }        
    }

    componentDidMount = () => {
        this.getRoomsAndRates()
    }

    getRoomsAndRates = async() => {
        let hotelId = this.props.hotelId
        let token = localStorage.getItem("inittoken")
        let correlationId = localStorage.getItem("correlationId")

        let ipData = await Axios.get("https://cors-anywhere.herokuapp.com/http://gd.geobytes.com/GetCityDetails")
        let ip = ipData.data.geobytesipaddress
        localStorage.setItem("ip", ip)

        let data = {
            "searchSpecificProviders":false
        }

        

        let config = {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Accept-Encoding": "gzip, deflate",
                "accountId": "demoAccount",
                "customer-ip": ip,
                "correlationId": correlationId
            }
        }
        let response = await Axios.post(
            `https://nexus.dev-env.vervotech.com/api/hotel/${hotelId}/roomsandrates/${token}`,
            data,
            config
        )

        let standardizedRoomsData = {}
        let standardizedRooms = response.data.hotel.standardizedRooms
        // standardizedRooms.config = config


        await response.data.hotel.recommendations.forEach(element => {

            console.log(element.groupId)
            if (standardizedRoomsData.hasOwnProperty(("_" + element.groupId))) {
                standardizedRoomsData["_" + element.groupId].push(element)

            } else {
                standardizedRoomsData["_" + element.groupId] = [element]
            }
        });


        console.log("sl ", standardizedRooms)
        this.setState({
            standardizedRoomsData,
            standardizedRooms,
            loading: false,
            config,
            hotelId: response.data.hotel.id,
            token: response.data.token,
            currency: response.currency
        })

    }

    loadMore = () => {
        this.setState({ loadMore: !this.state.loadMore })
    }

    handleSelection = (token) => {
        this.setState({
            selected: token
        })
    }
    render(){
        if(this.state.loading){
            return (

                <div className="loading">
                    <Spin size="large" />
                </div>

            )
        } else {

            let combinationCosts = []
            
            for (let i in this.state.standardizedRoomsData) {

                let roomsarray
                if (this.state.loadMore) {
                    roomsarray = this.state.standardizedRoomsData[i]
                } else {
                    roomsarray = this.state.standardizedRoomsData[i].slice(0, 2)
                }

                let roomData = this.state.standardizedRooms[Number(i.slice(1)) -1]
                console.log("SR ", roomData);
                combinationCosts.push(
                    <div className="combinationCostscontainer">
                        <div className="combinationImageName">
                           
                            <div style={{display:"flex", flexDirection:"column"}}>
                            {(roomData.images.length > 0) &&
                                <div className="RoomsImageContainer">
                                    {roomData.images.map((element, index) => (
                                    <div key={index} className = "RoomsImage"style={{ backgroundImage: `url( ${element.links[0].url} )` }} />
                                    ))}

                                    
                                </div>}
                                <div className="combinationCostscontainerroomName">{roomData.name}</div>
                                {(roomData.hasOwnProperty("facilities")) && (roomData.facilities.length > 0) && 
                                    <Facilities facilities={roomData.facilities} />
                                }

                                <RoomPriceContainer 
                                hotelId={this.state.hotelId} 
                                token={this.state.token}
                                config={this.state.config}
                                rooms={roomsarray} 
                                handleSelection={this.handleSelection} 
                                selectedtoken={this.state.selected}
                                />
                            </div>

                        </div>

                        <hr className="hrStyle"/>
                    </div>)
            }
            return (
                <div className="RoomsAndRatesContainer">
                    {combinationCosts}

                </div>
            )
        }


    }
}