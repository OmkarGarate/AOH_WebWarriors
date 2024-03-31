import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useAuthContext } from "../hooks/useAuthContext";

function ProfLive() {
  const { user } = useAuthContext();
  const [events, setEvents] = useState([]);
  console.log(user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/events/');
        if (response.ok) {
          const json = await response.json();
          const userEvents = json.filter(event => event.createdBy === user.user._id);
          const filteredEvents =  Object.values(userEvents).filter(event => {
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
            const month = currentDate.getMonth(); // Adding 1 to month because months are zero-based
            const day = currentDate.getDate();



            // console.log(year, month, day)
            // console.log(eventYear >= year && eventMonth >= month && eventDay >= day)
            if (eventYear == year && eventMonth == month && eventDay == day) {
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
          console.log("live: ",filteredEvents)
          setEvents(filteredEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    if (user && user.user.userType === "College") {
      fetchEvents();
    }
  }, [user]);


  // const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  const [slide, setSlide] = useState({
    transform: "translateX(0px)",
  });
  const [n, setN] = useState(1);
  // var k =1;

  // const events = [];
  //   for (var i = 0; i < 20; i++) {
  //   events.push({
  //       name: "Live event" + (i + 1),
  //       img : images[k]
  //   });
  //   if(k===7)
  //   {
  //       k=0;
  //   }else{
  //       k++;
  //   }
  //   }

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
      <div className="me">
        <h1 className="l-head">
          Created <strong>Events</strong>
        </h1>
        <ul className="me-ev">
          <li>
            <Link to={"/profilePage/profprev"}>Previous Events</Link>
            <div className="underline"></div>
          </li>
          <li>
            <Link to={"/profilePage"}>Live Events</Link>
            <div className="underline" style={{width: "100%"}}></div>
          </li>
          <li>
            <Link to={"/profilePage/profup"}>Upcoming Events</Link>
            <div className="underline"></div>
          </li>
        </ul>
      </div>
      {groupedEvents.length === 0 && (
        <h2 className="tanse">There are no events for today</h2>
      )}
      <div className="elWindow">


        <div className="elEvents" style={slide}>
          {groupedEvents.map((group, rowIndex) => (
            <div key={rowIndex} className="eventRow">
              {events ? (group.map((eve, index) => (
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
                
              ))) : (
                <h2>There are no Events for today</h2>
              )}
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
    </>
  );
}

export default ProfLive;
