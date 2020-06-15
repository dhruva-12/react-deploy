import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import { MdLocationOn } from 'react-icons/md'

const AnyReactComponent = ({ text }) => {
  const [hover, sethover] = useState(false);
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <MdLocationOn
        size={'3rem'}
        color={'#f48247'}
        onMouseOver={() => sethover(true)}
        onMouseOut={() => sethover(false)}
      />
      {hover && (
        <div
          style={{
            width: "max-content",
            color: "#f48247",
            backgroundColor: "white",
            padding: "1rem",
            fontSize: "1.5rem",
            borderRadius:'1rem'
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default class MapContainer extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "20vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDu7Ce9sXCWnLdDRiKcYqbK-4JK4ZwISUE" }}
          defaultCenter={{
            lat: this.props.geoCode.lat,
            lng: this.props.geoCode.long,
          }}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={this.props.geoCode.lat}
            lng={this.props.geoCode.long}
            text={this.props.name}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
