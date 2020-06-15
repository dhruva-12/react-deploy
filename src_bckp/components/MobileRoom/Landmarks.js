import React, {useState} from 'react'
import './Landmark.css'

const Landmarks = (props) => {
    const[viewMore, setViewMore] = useState(false)
    if(props.nearByAttractions.length === 0){
        return("")
    }

    

    

    const handleClick = () => {
        setViewMore(!viewMore)
    }

    let landmarks

    if(viewMore){
        landmarks = props.nearByAttractions
    } else {
        landmarks = props.nearByAttractions.slice(0, 5)
    }

    return(
        <div>
            <div className="LandmarkContainer">
                <div style={{fontWeight:'bold'}}>Most Popular Landmarks</div>
                {landmarks.map( landmark => (
                    <div style={{display:'flex', justifyContent:'space-between'}} key={landmark.name}>
                        <div>{landmark.name}</div>
                        <div>{landmark.distance+landmark.unit}</div>
                    </div>

                ))}
            </div>
            <div className="viewMore" onClick={handleClick}>
                <div>{viewMore?"View Less":"View More"}</div>
            </div>
            <hr style={{borderColor:'black', margin:"0 1rem"}}/>
        </div>
    )
}

export default Landmarks