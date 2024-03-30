import React, { useEffect, useState } from 'react'
import '../css/gallerynew.css'
import eveImg from '../Images/ems-imgs/eve2.jpeg'
import linkArrow from '../Images/linkArrow.png'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function GalleryNew() {

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
            
            
            if (eventYear < year) {
              // console.log("first");
              return true;
          } else if (eventYear <= year && eventMonth < month) {
              // console.log("second");
              return true;
          } else if (eventYear <= year && eventMonth <= month && eventDay < day) {
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
          console.log("gallery", filteredEvents)
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



  return (
    <div className='lae gnmain'>
    <h4 className='miniTitle'>MOSAIC GALLERY</h4>
    <h1 className='l-head'>Beautiful &  <strong>Unforgettable Times</strong></h1>
    <div className='galleryNew'>
    {events && events.map((eve, index) => (
    <div className="gnEve" key={index}>
        <img src={`http://localhost:5001/uploads/${eve.poster}`} alt="eveImg" className='eveImg'/>
        <div className="eveImgDesc">
            <h3>{eve.title}</h3>
            <p>Organised on {eve.date}</p>
            <img src={linkArrow} alt="linkArrow" />
        </div>
    </div>
        ))}



        {/* <div className="gnEve">
            <img src={eveImg} alt="eveImg" className='eveImg'/>
            <div className="eveImgDesc">
                <h3>Cricket Tournament</h3>
                <p>Organised on 7th March 2024</p>
                <img src={linkArrow} alt="linkArrow" />
            </div>
        </div>
        <div className="gnEve">
            <img src={eveImg} alt="eveImg" className='eveImg'/>
            <div className="eveImgDesc">
                <h3>Cricket Tournament</h3>
                <p>Organised on 7th March 2024</p>
                <img src={linkArrow} alt="linkArrow" />
            </div>
        </div>
        <div className="gnEve">
            <img src={eveImg} alt="eveImg" className='eveImg'/>
            <div className="eveImgDesc">
                <h3>Cricket Tournament</h3>
                <p>Organised on 7th March 2024</p>
                <img src={linkArrow} alt="linkArrow" />
            </div>
        </div>
        <div className="gnEve">
            <img src={eveImg} alt="eveImg" className='eveImg'/>
            <div className="eveImgDesc">
                <h3>Cricket Tournament</h3>
                <p>Organised on 7th March 2024</p>
                <img src={linkArrow} alt="linkArrow" />
            </div>
        </div>
        <div className="gnEve">
            <img src={eveImg} alt="eveImg" className='eveImg'/>
            <div className="eveImgDesc">
                <h3>Cricket Tournament</h3>
                <p>Organised on 7th March 2024</p>
                <img src={linkArrow} alt="linkArrow" />
            </div>
        </div>
        <div className="gnEve">
            <img src={eveImg} alt="eveImg" className='eveImg'/>
            <div className="eveImgDesc">
                <h3>Cricket Tournament</h3>
                <p>Organised on 7th March 2024</p>
                <img src={linkArrow} alt="linkArrow" />
            </div>
        </div> */}
    </div>
    <Link to={"/allGallery"} className='agLink'><button className='vag'>VIEW ALL GALLERY</button></Link>
    </div>
  )
}

export default GalleryNew