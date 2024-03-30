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

function PrevEvents() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  var k = 1;
  const events = [];
  for (var i = 0; i < 20; i++) {
    events.push({
      name: "Previous event" + (i + 1),
      img: images[k],
    });
    if (k === 7) {
      k = 0;
    } else {
      k++;
    }
  }

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

  console.log(n);
  console.log(Math.ceil(events.length / 5));

  return (
    <>
      <div className="me">
        <h1 className="l-head">
          <strong>Event</strong> Listing
        </h1>
        <ul className="me-ev">
          <li>
            <Link to={"/prevEvents"}>Previous Events</Link>
            <div className="underline" style={{width: "100%"}}></div>
          </li>
          <li>
            <Link to={"/"}>Live Events</Link>
            <div className="underline"></div>
          </li>
          <li>
            <Link to={"/upEvents"}>Upcoming Events</Link>
            <div className="underline"></div>
          </li>
        </ul>
      </div>
      <div className="elWindow">
        <div className="elEvents" style={slide}>
          {groupedEvents.map((group, rowIndex) => (
            <div key={rowIndex} className="eventRow">
              {group.map((eve, index) => (
                <Link to={"/eventPage"} className="elEve" key={index}>
                  <div className="dni">
                    <img src={eve.img} alt="" />
                    <div className="siDate">
                      <div className="sld">20</div>
                      <div className="slm">MAY</div>
                    </div>
                    <div className="orLine"></div>
                  </div>
                  <div className="eleDesc">
                    <h2>{eve.name}</h2>
                    <p className="ticketPrice">Tickets from $52</p>
                    <div className="slTime">
                      <div className="slt">
                        <img src={time} alt="time" />
                      </div>
                      <p>Start 20:00pm - 22:00pm</p>
                    </div>
                    <div className="slTime">
                      <div className="slt">
                        <img src={location} alt="location" />
                      </div>
                      <p>Kharghar, Navi Mumbai</p>
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
    </>
  );
}

export default PrevEvents;
