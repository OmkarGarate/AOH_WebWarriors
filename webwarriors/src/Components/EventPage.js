import React, {useState} from 'react'
import '../css/eventPage.css'
import eveImg from '../Images/Music-Festival-Poster-Design-1.jpg'
import prev from "../Images/prev.png"; 
import { Link } from 'react-router-dom';
import Sharebtn from './Sharebtn';
import like from "../Images/like.png" 
import liked from "../Images/liked.png" 

function EventPage() {
   // State to track whether the like button is clicked
   const [isLiked, setIsLiked] = useState(false);

   // Function to toggle the like button state
   const handleLikeClick = () => {
     setIsLiked(!isLiked);
   };

  return (
    <>
      <Link to={"/"}><button className='backBtn'><img src={prev} alt="next" /></button></Link>
    <div className="box">
      <div className="shareBtn">
    <Sharebtn title="Check out this event!" url={window.location.href}/>
    </div>
    <div className="poster">
      <img src={eveImg} alt="Poster"/>
    </div>
    <div className="description">
        <h1>MUSIC FESTIVAL 23 MAY</h1>
        <h3>Description</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo illo ipsam nam at nulla enim quisquam.</p>
        <div className="event-info">
            <h3>Event Information:</h3>
            <p><strong>Date:</strong> February 15, 2024</p>
            <p><strong>Time:</strong> 10:00 AM - 4:00 PM</p>
            <p><strong>Venue:</strong> Kharghar, Navi Mumbai</p>
            <p><strong>Entry Fees:</strong> Rs:50/-</p>
            <p><strong>Dress Code:</strong> Semi-formal</p>
            <div className="register-button">
                <button>Register Now</button>
            </div>
            
     </div>
</div>
<button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
        <img src={isLiked ? liked : like} alt='like'></img>
      </button>


    </div>
    </>
  )
}

export default EventPage