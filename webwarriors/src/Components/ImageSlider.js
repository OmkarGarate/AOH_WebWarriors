import React, { useState, useEffect } from "react";
import prev from "../Images/prev.png";
import time from '../Images/clock.png';
import location from '../Images/location.png';
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const ImageSlider = () => {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/events/');
        if (response.ok) {
          const json = await response.json();
          const filteredEvents =  Object.values(json).filter(event => {
            const eventDateParts = event.date.split('-');
            const eventYear = parseInt(eventDateParts[0]);
            const eventMonth = parseInt(eventDateParts[1]) - 1;
            const eventDay = parseInt(eventDateParts[2]);
            const eventDate = new Date(eventYear, eventMonth, eventDay);
            
            // console.log(eventYear, eventMonth, eventDay)
            // console.log(eventDate)
            
            // const currentDate = new Date()
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth(); 
            const day = currentDate.getDate();



            // console.log(year, month, day)
            // console.log(eventYear >= year && eventMonth >= month && eventDay >= day)
            
            
            if (eventYear > year) {
              // console.log("first");
              return true;
          } else if (eventYear >= year && eventMonth > month) {
              // console.log("second");
              return true;
          } else if (eventYear >= year && eventMonth >= month && eventDay > day) {
              // console.log("third");
              return true;
          }
          
          return false;
                      
          });

          // Sort filteredEvents array by event date in ascending order
          filteredEvents.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
          // console.log(filteredEvents)
          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    // if (user) {
      fetchEvents();
    // }
  }, [user]);
  

console.log(events)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if(events.length>4){
      setCurrentImageIndex(prevIndex =>
        prevIndex === events.length - 4 ? 0 : prevIndex + 1
      );
    }
    
  };

  const prevImage = () => {
    if(events.length>4){
      setCurrentImageIndex(prevIndex =>
        prevIndex === 0 ? events.length - 4 : prevIndex - 1
      );

    }
  };

  const displayedImages = events.slice(
    currentImageIndex,
    currentImageIndex + 4
  );

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return (
    <div className="sliderMain">
      <button onClick={prevImage} className="prev">
        <img src={prev} alt="prev" />
      </button>
      <div className="slider">
        {displayedImages && displayedImages.map((event, index) => (
          <Link to={`/eventPage/${event._id}`} className="slideEve" key={index}>
            {/* <img src={image.poster} alt="" className="slideImg" /> */}
            <img src={`http://localhost:5001/uploads/${event.poster}`} alt="contentImage" className="slideImg"/>
            <div className="siDate">
            <div className="sld">{event.date.split('-')[2]}</div><div className="slm">{monthNames[parseInt(event.date.split('-')[1]) - 1]}</div>
            </div>
            <div className="siDesc">
              <h2>{event.title}</h2>
              <p className="slor">Tickets from &#8377;{event.entryfees}</p>
              <div className="slTime">
                <div className="slt">
                  <img src={time} alt="time" />
                </div>
                <p>Start {event.time}</p>
              </div>
              <div className="slTime">
                <div className="slt"><img src={location} alt="location" /></div>
                <p>{event.venue}</p>
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
