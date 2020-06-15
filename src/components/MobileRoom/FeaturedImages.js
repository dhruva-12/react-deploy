import React, { useState } from 'react'
import './FeaturedImages.css'
import LazyLoad from 'react-lazyload';

const FeaturedImages = (props) => {
    let imagesArray = props.images
    const[image, setImage] = useState(imagesArray[0].url)

    const handleClick = (index) => {
        setImage(imagesArray[index].url)
    }

    return(
        <div className="featuredImages" >
            <div className="firstRow">
                <div 
                    className="imageContainer" 
                    style={{backgroundImage: `url(${image})`}}
                />
                {/* <div 
                    className="imageContainer" 
                    style={{backgroundImage: `url(${imagesArray[1].url})`}}
                /> */}
            </div>

            <div className="firstRow" style={{marginTop:'1vw'}}>
                {imagesArray.map((image, index) => (
                    // <LazyLoad key={image.url}>
                        <div
                            key={image.url}
                            onClick={() => handleClick(index)}
                            className="smallImageContainer"
                            style={{ backgroundImage: `url(${image.url})` }}
                        />
                    // </LazyLoad>
                ))}
                </div>

        </div>
    )

}

export default FeaturedImages