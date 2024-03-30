import React, { useState } from "react";
import prev from "../Images/prev.png";
import time from '../Images/clock.png'
import location from '../Images/location.png'
import { Link } from "react-router-dom";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 4 : prevIndex - 1
    );
  };

  // Display the current and the next three images
  const displayedImages = images.slice(
    currentImageIndex,
    currentImageIndex + 4
  );

  return (
    <div className="sliderMain">
      <button onClick={prevImage} className="prev">
        <img src={prev} alt="prev" />
      </button>
      <div className="slider">
        {displayedImages.map((image, index) => (
          <Link to={"/eventPage"} className="slideEve" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="slideImg" />
            <div className="siDate">
                <div className="sld">20</div><div className="slm">MAY</div>
            </div>
            <div className="siDesc">
                <h2>The Governors Music Festival 2018</h2>
                <p className="slor">Tickets from $52</p>
                <div className="slTime">
                    <div className="slt">
                        <img src={time} alt="time" />
                    </div>
                    <p>Start 20:00pm - 22:00pm</p>
                </div>
                <div className="slTime">
                    <div className="slt"><img src={location} alt="location" /></div>
                    <p>Kharghar, Navi Mumbai</p>
                </div>
                <button className="sltad">TICKETS & DETAILS</button>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={nextImage} className="next">
        <img src={prev} alt="next" />
      </button>
    </div>
  );
};

export default ImageSlider;
