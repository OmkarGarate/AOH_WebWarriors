import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import time from "../Images/clock(white).png";
import location from "../Images/location(white).png";
import { useAuthContext } from "../hooks/useAuthContext";

function CreatedEve() {

  const { user } = useAuthContext();
//   console.log(user.user._id)

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/events/');
        if (response.ok) {
          const json = await response.json();
          const userEvents = json.filter(event => event.createdBy === user.user._id);
          setEvents(userEvents);
          console.log(events)
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    if (user.user._id) {
      fetchEvents();
    }
  }, [user]);

  
  const [slide, setSlide] = useState({
    transform: "translateX(0px)",
  });
  const [n, setN] = useState(1);

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
  return (
    <>
      
      {events?(<div>
        <div className="elWindow">
        <div className="elEvents" style={slide}>
          {groupedEvents.map((group, rowIndex) => (
            <div key={rowIndex} className="eventRow">
              {group.map((eve, index) => (
                <Link to={`/eventPage/${eve._id}`} className="elEve" key={index}>
                  <div className="dni">
                    {/* <img src={eve.img} alt="" /> */}
                    <img src={`http://localhost:5001/uploads/${eve.poster}`} alt="contentImage" />
                    <div className="siDate">
                      <div className="sld">{eve.date.split('-')[2]}</div>
                      <div className="slm">{monthNames[parseInt(eve.date.split('-')[1]) - 1]}</div>
                    </div>
                    <div className="orLine"></div>
                  </div>
                  <div className="eleDesc">
                    <h2>{eve.name}</h2>
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
      <div className="ELbtns">
        <button className="prev" onClick={goToPrev}>
          prev
        </button>
        <button className="next" onClick={goToNext}>
          next
        </button>
      </div>
      </div>):(
        <h1 className="nsef">No such events found.</h1>
      )}
    </>
  );
}

export default CreatedEve;
