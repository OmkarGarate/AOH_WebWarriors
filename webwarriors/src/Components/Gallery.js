import React, {useState, useEffect} from 'react'
import img1 from '../Images/Image1.jpg'
import img2 from '../Images/Image2.jpg'
import img3 from '../Images/Image3.jpg'
import img4 from '../Images/Image4.jpg'
import img5 from '../Images/Image5.jpg'
import img6 from '../Images/Image6.jpg'
import img7 from '../Images/Image7.jpg'
import img8 from '../Images/Image8.jpg'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";

function Gallery() {

    const { user } = useAuthContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/events/');
        if (response.ok) {
          const json = await response.json();
          console.log("allEve", json)
          setEvents(json);
          }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    // if (user) {
      fetchEvents();
    // }
  }, [user]);

      const chunkSize = 8; // Set the number of events per row
      
  // Create an array of arrays, each containing chunkSize events
  const groupedEvents = Array.from(
    { length: Math.ceil(events.length / chunkSize) },
    (v, i) => events.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
    
  return (
    <div className='lae photoGallery' id='gallery'>
        <h4 className='miniTitle'>MOSAIC GALLERY</h4>
        <h1 className='l-head'>Beautiful &  <strong>Unforgettable Times</strong></h1>
        <div className="gallery">
            {groupedEvents.map((events, rowIndex)=>(
                <div className="rowIndex" key={rowIndex}>
                    {events.map((eve, index)=>(
                    <Link to={"/eventPage"} className={`evePhotos item${index + 1}`} key={index} >
                        {/* <div className="cover"></div> */}
                        {/* <img src={eve.img} alt="Event" className='grayImg'/> */}
                        <img src={`http://localhost:5001/uploads/${eve.poster}`} alt="contentImage" className='grayImg'/>
                        <div className="geDesc">
                            <h2>{eve.title}</h2>
                            <p>{eve.desc}</p>
                        </div>
                    </Link>
                ))}
                </div>
            ))}
            
        </div>
        <Link to={"/allGallery"} className='agLink'><button className='vag'>VIEW ALL GALLERY</button></Link>
    </div>
  )
}

export default Gallery