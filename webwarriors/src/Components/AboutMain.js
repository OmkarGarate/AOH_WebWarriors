import React from 'react'
import friendly_color from "../Images/Images2/Images/friendly_color.png";
import venue_color from "../Images/Images2/Images/venue_color.png";
import scenario_color from "../Images/Images2/Images/scenario_color.png";
import time_color from "../Images/Images2/Images/time_color.png";
import phone_color from "../Images/Images2/Images/phone_color.png";
import idea_color from "../Images/Images2/Images/idea_color.png";
import friendly_normal from "../Images/Images2/Images/friendly_normal.png";
import venue_normal from "../Images/Images2/Images/venue_normal.png";
import scenario_normal from "../Images/Images2/Images/scenario_normal.png";
import time_normal from "../Images/Images2/Images/time_normal.png";
import phone_normal from "../Images/Images2/Images/phone_normal.png";
import idea_normal from "../Images/Images2/Images/idea_normal.png";
import prev from "../Images/Images2/Images/prev.png";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../css/about.css'

function AboutMain() {
  
    const [count, setCount] = useState({
      width:"0px",
      opacity: "0"
    });
  

    useEffect(() => {
      setTimeout(() => {
        setCount({width:"500px", opacity: "1"});
      });
      window.scrollTo({top: "0"});
    }, [])

    const scrollToTop = () => {
      window.scrollTo({top: "0" , behavior:"smooth"});
    }
    
  return (
    <>
    <Link to={'/'}><button className="backBtn"><img src={prev} alt="" /></button></Link>
    <div className="amHeading1"><p>About Mosaic</p></div>
    <div className="amHeading2">The Palette of <strong>College Events</strong></div>
    <div className="aboutcon2 aboutmain">
            <div className="amMain">
            <div className="ac2h am1">
              <div className="aboutimg">
                <img src={friendly_color} alt="" />
                <img src={friendly_normal} alt="" />
              </div>  
              <div className="imgDesc">
                <h4>Friendly Team</h4>
                <p>More than 200 teams</p>
              </div>
            </div>
            <div className="vr"></div>
            <div className="amDes" style={count}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate illum beatae. Error, veniam hic quis ab vel eaque asperiores!</p></div>
            </div>
            <div className="amMain">
            <div className="amDes" style={count}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate illum beatae. Error, veniam hic quis ab vel eaque asperiores!</p></div>
            <div className="vr"></div>
            <div className="ac2h am1">
              <div className="aboutimg">
                <img src={venue_color} alt="" />
                <img src={venue_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Perfect Venues</h4>
                <p>Perfect Venues</p>
              </div>
            </div>
            </div>
            <div className="amMain">
            <div className="ac2h am1">
              <div className="aboutimg">
                <img src={scenario_color} alt="" />
                <img src={scenario_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Unique Scenarios</h4>
                <p>We thinking out of the box</p>
              </div>
            </div>
            <div className="vr"></div>
            <div className="amDes" style={count}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate illum beatae. Error, veniam hic quis ab vel eaque asperiores!</p></div>
            </div>
            <div className="amMain">
            <div className="amDes" style={count}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate illum beatae. Error, veniam hic quis ab vel eaque asperiores!</p></div>
            <div className="vr"></div>
            <div className="ac2h am1">
              <div className="aboutimg">
                <img src={time_color} alt="" />
                <img src={time_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Unforgettable Time</h4>
                <p>We make you perfect event</p>
              </div>
            </div></div>
            <div className="amMain">
            <div className="ac2h am1">
              <div className="aboutimg">
                <img  className="supportimg" src={phone_color} alt="" />
                <img className="supportimg" src={phone_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>24/7 Hours Support</h4>
                <p>Anytime anywhere</p>
              </div>
            </div>
            <div className="vr"></div>
            <div className="amDes" style={count}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate illum beatae. Error, veniam hic quis ab vel eaque asperiores!</p></div>
            </div>
            <div className="amMain">
            <div className="amDes" style={count}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione cupiditate illum beatae. Error, veniam hic quis ab vel eaque asperiores!</p></div>
            <div className="vr"></div>
            <div className="ac2h am1">
              <div className="aboutimg">
                <img src={idea_color} alt="" />
                <img src={idea_normal} alt="" />
              </div>
              <div className="imgDesc">
                <h4>Brilliant Idea</h4>
                <p>We have million idea</p>
              </div>
            </div>
            </div>
          </div>
          <button className="backBtn toTopBtn " onClick={scrollToTop}><img src={prev} alt="" /></button>
    </>
  )
}


export default AboutMain