import React from 'react'
import  MapContainer  from './HotelMap'
import './HotelLocation.css'
const HotelLocation = (props) => {
    return (
        <div className="HotelLocationContainer">
            <MapContainer geoCode={props.geoCode} name={props.name} />
            <div style={{ margin: "1rem" }}>
                {props.address.line1 ? props.address.line1 + ", " : ""}
                {props.address.line2 ? props.address.line1 + ", " : ""}
                {props.address.city ? props.address.city + ", " : ""}
                {props.address.state ? props.address.state + ", " : ""}
                {props.address.country ? props.address.country + ", " : ""}
                {props.address.postalCode ? props.address.postalCode : ""}
            </div>
            <hr style={{borderColor:'black', margin:"0 1rem"}}/>
        </div>
    )
}

export default HotelLocation