import React from 'react'
import img1 from '../Images/Image1.jpg'
import img2 from '../Images/Image2.jpg'
import img3 from '../Images/Image3.jpg'
import img4 from '../Images/Image4.jpg'
import img5 from '../Images/Image5.jpg'
import img6 from '../Images/Image6.jpg'
import img7 from '../Images/Image7.jpg'
import img8 from '../Images/Image8.jpg'
import { Link } from 'react-router-dom'

function Gallery() {

    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8
    ]

    var k =0;

    const events = [];
      for (var i = 0; i < 8; i++) {
        events.push({
            name: "Event" + (i+1),
            desc: "Organized on " + (i+1)+2 + " June 2023",
            img : images[k]
        })
      if(k===7)
      {
          k=0;
      }else{
          k++;
      }
      }

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
                        <img src={eve.img} alt="Event" className='grayImg'/>
                        <div className="geDesc">
                            <h2>{eve.name}</h2>
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