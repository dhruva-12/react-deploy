import React from "react";
import {GoSearch, GoX} from "react-icons/go";
import './MobileLocation.css'
import moment from 'moment';

const MobileLocation = (props) => {
  return (
    <div className="MobileLocationContainer" onClick={props.handleSearch}>
      <div className="MobileLocationLeft">
        <div>{props.place}</div>
        <div className="MobileLocationDate">
          {moment(props.startDate).format("D MMM")} -{" "}
          {moment(props.endDate).format("D MMM")}
        </div>
      </div>
      {props.search ? <GoX /> : <GoSearch color="#f48244" />}
    </div>
  );
};

export default MobileLocation;
