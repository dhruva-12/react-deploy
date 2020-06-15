import React from 'react'
import { FaStar } from 'react-icons/fa';
import './HotelReviews.css'

const HotelReviews = (props) => {

    let stars = []
    for(let i=0;i<props.starRating;i++){
        stars.push(<FaStar key={i} style={{color:'#f48240'}}/>)
    }

    return(
        <div className="reviewsContainer">
            <div>{props.type}</div>
            <div className="reviewStars">{stars}</div>
            
        </div>
    )
}

export default HotelReviews

