import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../Images/Image1.jpg";
import img2 from "../Images/Image2.jpg";
import img3 from "../Images/Image3.jpg";
import img4 from "../Images/Image4.jpg";
import img5 from "../Images/Image5.jpg";
import img6 from "../Images/Image6.jpg";
import img7 from "../Images/Image7.jpg";
import img8 from "../Images/Image8.jpg";
import time from "../Images/clock(white).png";
import location from "../Images/location(white).png";
import arrow from "../Images/prev.png";
import { useEffect } from "react";

function HomeSlider() {
  const [slide, setSlide] = useState({
    transform: "translateX(0vw)",
  });

  const [n, setN] = useState(1);

  const left = () => {
    const trs = n === 1 ? 0 : (n - 2) * -100;
    setN(n === 1 ? 1 : n - 1);

    setSlide({
      transform: `translateX(${trs}vw)`,
    });
  };

  const right = () => {
    const trs = n === 4 ? (4 - 1) * -100 : n * -100;
    setN(n === 4 ? 4 : n + 1);

    setSlide({
      transform: `translateX(${trs}vw)`,
    });
  };

  useEffect(() => {
    const changeSlide = (count) => {
      setTimeout(() => {
        if (count === 4) {
          count=0;
        }
  
        const trs = count === 4 ? (4-1) * -100 : count * -100;
        // count=count === 4 ? 4 : count + 1;
  
        setSlide({
          transform: `translateX(${trs}vw)`,
        });
  
        if (count < 4) {
          changeSlide(count + 1); // Call the function recursively
        }
      }, 5000);
    };
  
    changeSlide(1); // Start the recursion with initial count
  }, []);
  
  
  
  
  return (
    <div className="homeSlider">
      <div className="slidermain">
        <div className="sliderbtns">
          <div className="left sldBtn" onClick={left}>
            <img src={arrow} alt="arrow" />
          </div>
          <div className="right sldBtn" onClick={right}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="sliderwindow">
          <div className="simages" style={slide}>
            <div className="slide">
              <div className="cover"></div>
              <img src={img1} alt="img1" />
              
            </div>
            <div className="slide">
              <div className="cover"></div>
              <img src={img2} alt="img2" />
              
            </div>
            <div className="slide">
              <div className="cover"></div>
              <img src={img6} alt="img6" />
              
            </div>
            <div className="slide">
              <div className="cover"></div>
              <img src={img4} alt="img4" />
              
            </div>
          </div>
        </div>
        <div className="sldDesc">
                <div className="slideDesc">
                <h1>MOSAIC</h1>
                <p className="miniTitle" style={{ color: "white" }}>
                  THE PALETTE OF COLLEGE EVENTS
                </p>
              </div>
              <div className="sdBtns">
                <button className="vag">ABOUT US</button>
                <button className="vag gs">GET STARTED!</button>
              </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
