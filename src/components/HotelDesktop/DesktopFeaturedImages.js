import React from 'react'
import './DesktopFeaturedImages.css'

const DesktopFeaturedImages = (props) => {
    let imagesArray = props.images

    return (
        <div className="DesktopFeaturedImagesContainer">
            <div
                className="mainImage"
                style={{ backgroundImage: `url(${imagesArray[0].url})` }}
            />
            <div className="sideImageContainer" >

                {imagesArray.slice(1).map( (image, index) => 
                    <div 
                        className="sideImage" 
                        key={index}
                        style={image ? { backgroundImage: `url(${image.url})` } : {}} 
                    /> 
                )}
            </div>

        </div>
    )
}

export default DesktopFeaturedImages