import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import time from "../Images/clock(white).png";
import location from "../Images/location(white).png";
import filter from '../Images/filter.png';
import '../css/category.css'
import { useAuthContext } from "../hooks/useAuthContext";

function LiveEvents() {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:5001/events/`);
        if (response.ok) {
          const json = await response.json();
          
          const filteredEvents =  Object.values(json).filter(event => {
            const eventDateParts = event.date.split('-');
            const eventYear = parseInt(eventDateParts[0]);
            const eventMonth = parseInt(eventDateParts[1]) - 1;
            const eventDay = parseInt(eventDateParts[2]);
            const eventDate = new Date(eventYear, eventMonth, eventDay);
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const day = currentDate.getDate();
            if (eventYear === year && eventMonth === month && eventDay === day) {
              return true;
            }
            return false;
          });
          if(selectedCategory)
        {
          const fltEve=filteredEvents.filter(eve => eve.category === selectedCategory)   
          setEvents(fltEve);
        }else{
          setEvents(filteredEvents)
        }

          // events.map((eve,index)=>{
          //   console.log(eve.category)
          // })
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, [selectedCategory]);

  const chunkSize = 3;
  const groupedEvents = Array.from(
    { length: Math.ceil(events.length / chunkSize) },
    (v, i) => events.slice(i * chunkSize, i * chunkSize + chunkSize)
  );

  const toggleCategoryVisibility = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


  return (
    <>
      <div className="me">
        <div className="elCat">
          <h1 className="l-head">
            <strong>Event</strong> Listing
          </h1>
          <div className="categoryMain">
            <div className="cateBtn">
              <button onClick={toggleCategoryVisibility}>Filter<img src={filter} alt="Filter" /></button>
            </div>
            <div className={`category ${isCategoryVisible ? 'visible' : 'hidden'}`}>
              <div className="cateBtn">
                <button style={{ backgroundColor: selectedCategory === 'Cultural' ? 'red' : '' }} onClick={() => handleCategoryClick('Cultural Events')}>Cultural Events</button>
              </div>
              <div className="cateBtn">
                <button style={{ backgroundColor: selectedCategory === 'Sports' ? 'red' : '' }} onClick={() => handleCategoryClick('Sports')}>Sports</button>
              </div>
              <div className="cateBtn">
                <button style={{ backgroundColor: selectedCategory === 'Technical' ? 'red' : '' }} onClick={() => handleCategoryClick('Technical')}>Technical</button>
              </div>
              <div className="cateBtn">
                <button style={{ backgroundColor: selectedCategory === 'E-Sports' ? 'red' : '' }} onClick={() => handleCategoryClick('E-Sports')}>E-Sports</button>
              </div>
              <div className="cateBtn">
                <button style={{ backgroundColor: selectedCategory === 'Placement' ? 'red' : '' }} onClick={() => handleCategoryClick('Placements')}>Placements</button>
              </div>
              <div className="cateBtn">
                <button style={{ backgroundColor: selectedCategory === 'Others' ? 'red' : '' }} onClick={() => handleCategoryClick('Others')}>Others</button>
              </div>
            </div>
          </div>
        </div>
        <ul className="me-ev">
          <li>
            <Link to={"/prevEvents"}>Previous Events</Link>
            <div className="underline"></div>
          </li>
          <li>
            <Link to={"/"}>Live Events</Link>
            <div className="underline" style={{ width: "100%" }}></div>
          </li>
          <li>
            <Link to={"/upEvents"}>Upcoming Events</Link>
            <div className="underline"></div>
          </li>
        </ul>
      </div>
      <div className="elWindow">
        {groupedEvents.length === 0 && (
          <h2 className="tanse">There are no events for today</h2>
        )}
        <div className="elEvents">
          {groupedEvents.map((group, rowIndex) => (
            <div key={rowIndex} className="eventRow">
              {group.map((eve, index) => (
                <Link to={`/eventPage/${eve._id}`} className="elEve" key={index}>
                  <div className="dni">
                    <img src={`http://localhost:5001/uploads/${eve.poster}`} alt="contentImage" />
                    <div className="siDate">
                      <div className="sld">{eve.date.split('-')[2]}</div>
                      <div className="slm">{monthNames[parseInt(eve.date.split('-')[1]) - 1]}</div>
                    </div>
                    <div className="orLine"></div>
                  </div>
                  <div className="eleDesc">
                    <h2>{eve.title}</h2>
                    <p className="ticketPrice">Tickets from &#8377;{eve.entryfees}</p>
                    <div className="slTime">
                      <div className="slt">
                        <img src={time} alt="time" />
                      </div>
                      <p>Start {eve.time}</p>
                    </div>
                    <div className="slTime">
                      <div className="slt">
                        <img src={location} alt="location" />
                      </div>
                      <p>{eve.venue}</p>
                    </div>
                    <button>TICKETS & DETAILS</button>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default LiveEvents;
