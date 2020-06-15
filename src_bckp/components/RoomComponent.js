import React from "react";
import {Carousel} from "antd";
import {Link} from "react-router-dom";
import { Button, Icon } from 'antd';
import { FaStar } from 'react-icons/fa';
const RoomComponent = (props) =>{
    const handleClick = () => {
        console.log(props)
        props.history.push({
			pathname: `/hotel/${props.id}`,
				state: {
					place: props.history.location.state.place,
					startDate: props.history.location.state.startDate,
					endDate: props.history.location.state.endDate,
				}
		  });
    }
    let currency = localStorage.getItem('currency')


    return (
        <div key={props.id} className="roomUIContainer" id={`room-${props.id}`}>
            <div className="roomUI">
                <div className="carouselContainer">
                    {/* <Carousel draggable={true} autoplay={true}> */}
                        <Link to={`/hotel/${props.id}`}>
                            <div className="roomUIimagecontainer">
                                <div className="roomUIimage" style={{ backgroundImage: `url(${props.heroImage})` }}>
                                </div></div>
                        </Link>
                    {/* </Carousel> */}
                </div>

                <div className="roomUIData">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span className="roomType" style={{marginLeft:0}}>{props.type}</span>
                            <span className="roomName" style={{fontWeight:"bold"}}>
                                    <Link to={`/hotel/${props.id}`}>
                                        {props.name}
                                    </Link>
                                </span>
                                <div className="stars"> {props.starRating} <FaStar style={{color:'#f48240'}}/></div>
                        </div>
                    <div className="roomUIDataLeft">

                        <div>
                            {props.contact.address.city.name && <span>{props.contact.address.city.name}</span>}
                            {props.contact.address.country.name && <span>, {props.contact.address.country.name}</span>} ∙
                            <span> Show on Map</span>
                        </div>
                        
                    </div>

                    <div className="roomDataRight" style={{marginTop:"auto"}}>
                        <div className="roomUIpriceheading">Price per night as low as </div>
                        <div className={`roomUIPrice room-${props.id}-price`}>{props.rate ? currency + " " + props.rate.totalRate : "Loading"}</div>

                    </div>
                    <div className="roomDataRight">
                        <Button 
                        style={{backgroundColor: "#0076cf"}} 
                        type="primary"

                        onClick={handleClick}
                        >See availability  ❯</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RoomComponent;