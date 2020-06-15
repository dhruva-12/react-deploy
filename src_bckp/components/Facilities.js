import React, {useState} from 'react'
import './HotelDesktop/RoomsAndRates.css'



const Facilities = (props) => {

    const[moreFacilities, setFacilities] = useState(false)

    const handleClick = () => setFacilities(!moreFacilities)

    let list = (moreFacilities?props.facilities:props.facilities.slice(0, 11))
    return (
        <div style={{display: 'flex', flexWrap: "wrap"}}>


            {list.map((element, index) => (<span className="facility" key={index}>{element.name}</span>))} 

            <div className="viewMore" style={{margin:0}}onClick={handleClick}>
                <div>{moreFacilities?"View Less":"View More"}</div>
            </div>
        </div>
    )
}

export default Facilities
