// import React from 'react'
import React, { useEffect, useState } from "react";
import eve1 from '../Images/ems-imgs/eve1.jpeg'
import eve2 from '../Images/ems-imgs/eve2.jpeg'
import eve3 from '../Images/ems-imgs/eve3.jpeg'
import rlike from '../Images/rlike.png'
import arrow from "../Images/prev.png";
import '../css/er.css'
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";


function EventRecommendation() {

  
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/events/');
        if (response.ok) {
          const json = await response.json();
          const sortedEvents = json.sort((a, b) => b.likes.length - a.likes.length);
          setEvents(sortedEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    // if (user) {
      fetchEvents();
    // }
  }, [user]);


  const chunkSize = 3; // Set the number of events per row

  // Create an array of arrays, each containing chunkSize events
  const groupedEvents = Array.from(
    { length: Math.ceil(events.length / chunkSize) },
    (v, i) => events.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const goToPrev = () => {
    const trs = n === 1 ? 0 : (n - 2) * -490;
    setN(n === 1 ? 1 : n - 1);

    setSlide({
      transform: `translateX(${trs}px)`,
    });
  };

  const goToNext = () => {
    const trs =
      n === Math.ceil(events.length / 3)
        ? (Math.ceil(events.length / 3) - 1) * -490
        : n * -490;
    setN(
      n === Math.ceil(events.length / 3) ? Math.ceil(events.length / 3) : n + 1
    );

    setSlide({
      transform: `translateX(${trs}px)`,
    });
  };

  // console.log(n);
  // console.log(Math.ceil(events.length / 5));

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const [slide, setSlide] = useState({
        transform: "translateX(0px)",
      });
  
      const [n, setN] = useState(1);
  
      const left = () => {
        const trs = n === 1 ? 0 : (n - 2) * -990;
        setN(n === 1 ? 1 : n - 1);
  
        setSlide({
          transform: `translateX(${trs}px)`,
        });
      };
  
      const right = () => {
        const trs = n === 2 ? (2 - 1) * -990 : n * -990;
        setN(n === 2 ? 2 : n + 1);
  
        setSlide({
          transform: `translateX(${trs}px)`,
        });
      };

      
  
  return (
    <>
    <div className="eventRecommendation">
        <div className="erSlider">
            <h1>Recommended Events</h1>
            <div className="sliderbtns erSliderBtns">
          <div className="left sldBtn" onClick={left}>
            <img src={arrow} alt="arrow" />
          </div>
          <div className="right sldBtn" onClick={right}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
            <div className="erWindow">
                <div className="erTotalEvents" style={slide}>
                  {events.map((eve, index)=>(
                    <Link to={`/eventPage/${eve._id}`} className="erEvent1" key={index}>
                      <div className="eventposter">
                      <img src={`http://localhost:5001/uploads/${eve.poster}`} alt="" />
                      </div>
                      <div className="likes"><img src={rlike} alt="like" /><p>{eve.likes.length}</p></div>
                      <div className="eventType"><h3>{eve.title}</h3></div>
                    <div className="clgName"><h4>{eve.venue}</h4></div>
                </Link>
                  ))}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default EventRecommendation