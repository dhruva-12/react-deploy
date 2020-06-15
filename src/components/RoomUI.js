import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import './RoomUI.css'
import { Icon, Carousel } from 'antd';

// var Carousel = require('react-responsive-carousel').Carousel;





class RoomUI extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    handleClick = () => {
        this.setState({
            expanded: !this.state.expanded,
        })
    }
    render() {

        let room = this.props.room
        let { images, slug } = room

        let backgroundImage = images[0] || defaultImg

        let expandedFeatures = (
            <div className="expandedFeatures">
                {room.extras.map((item)=>(<span key={item} style={{margin:"2rem"}}>{item}</span>))}
            </div>
        )

        return (
            <div className="roomUIContainer">
                <div className="roomUI">
                    
                        {/* <div className="roomUIimagecontainer">
                    
                        <div className="roomUIimage" style={{ backgroundImage: `url(${backgroundImage})` }} />
                    
                </div> */}

                    <div className="carouselContainer">
                        <Carousel draggable={true} autoplay={true} lazyLoad={true}>
                            {(images.slice(0, Math.min(4, images.length))).map((item) => (
                                <Link key={item} to={`/rooms/${slug}`}>
                                    <div className="roomUIimagecontainer">
                                        <div className="roomUIimage" key={item} style={{ backgroundImage: `url(${item})` }}>




                                        </div></div>
                                </Link>

                            ))}
                        </Carousel>

                    </div>




                        {/* <Carousel autoplay>
                    
                

                </Carousel> */}
                    

                    <div className="roomUIData">
                        <div className="roomUIDataLeft">
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <span className="roomType">{room.type}</span>
                                <span className="roomName">
                                    <Link to={`/rooms/${slug}`}>
                                        {room.name}
                                    </Link>

                                </span>
                                <span className="stars">{room.rating} <Icon type="star" style={{color:"yellow"}}/></span>
                            </div>
                            <div className="roomIcons">

                                {room.wifi && <Icon type="wifi" style={{ fontSize: "2rem", marginRight: "1rem" }} />}


                                <span className="roomUIMore" onClick={this.handleClick}>
                                    {this.state.expanded ? "Less" : "More ▾"}
                                </span>
                            </div>
                        </div>

                        <div className="roomDataRight">
                            <div className="roomUIpriceheading">Price per night as low as</div>
                            <div className="roomUIPrice">{room.price}</div>

                        </div>
                    </div>


                </div>
                {this.state.expanded && (<div className="expandedFeaturesContainer">
                    {expandedFeatures}
                </div>)}
        </div>
        )
    }

}

RoomUI.propTypes = {
    room: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired
    })
};
export default RoomUI