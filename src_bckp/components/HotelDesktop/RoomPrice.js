import React, { Component } from 'react'
import { Spin } from 'antd';
import Axios from 'axios'
import './RoomPrice.css'
import {Button} from 'antd'

export default class RoomPrice extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
           
        }
    }

    componentDidMount = async () => {

        let response
        try{
        response = await Axios.get(
            `https://nexus.dev-env.vervotech.com/api/hotel/${this.props.hotelId}/${this.props.token}/price/recommendation/${this.props.recommendationId}`,
            this.props.config
        )
        console.log("data",response.data)
        this.setState({
            loading: false,
            data: response.data
        })
        } catch(e){
            console.log("e - ",e)
        }

        
    }

    onClick = () => {
        // this.props.handleSelection(this.props.recommendationId)
    }

    render(){

        let button = (<Button ghost type="primary" onClick={this.onClick} style={{color:"#0076cd"}}>Select</Button>)
        if(!this.state.loading){
            if(this.state.data){
                if(this.props.selectedtoken === this.props.recommendationId){
                    button = (<Button  type="primary" style={{backgroundColor:"#0076cd"}}>Selected</Button>)
                }
            }
        }
        
        
            if(this.state.loading || !this.state.data.hotel.rates || this.state.data.hotel.rates.length === 0){
                return (
                    <div className="RoomPriceContainer" style={{display:"none"}} />
                )
            }
            return(
                <div className="RoomPriceContainer" key={this.props.recommendationId} >
                    
                    {this.state.data.hotel.rooms && this.state.data.hotel.rooms.map( (element, index) => (
                        <div key={index}>
                            <span style={{fontWeight:"bold"}}>Room {index +1}: </span>
                            {element.name}
                        </div>
                    ))}

                    <div>{this.state.data.hotel.rates && this.state.data.hotel.rates.length > 0&& (this.state.data.hotel.rates[0].boardBasis.description || this.state.data.hotel.rates[0].boardBasis.type) }</div>
                    <div style={{height:"5vh"}}>

                    </div>
                    <div className="roomSelect">
                        
                        <div className="costRoom">
                        {this.state.data.currency + " "}
                         {this.state.data.hotel.rates && this.state.data.hotel.rates.length > 0&& this.state.data.hotel.rates[0].totalRate} 
                        </div>

                        {button}

                    </div>

                </div>
            )

        
    }
}