import React, { useEffect, useState } from "react";
import "../css/eventPage.css";
import eveImg from "../Images/Music-Festival-Poster-Design-1.jpg";
import prev from "../Images/prev.png";
import { Link, useParams } from "react-router-dom";
import Sharebtn from "./Sharebtn";
import like from "../Images/like.png";
import liked from "../Images/liked.png";
import { useAuthContext } from "../hooks/useAuthContext";


function EventPage() {
  // State to track whether the like button is clicked
  const [isLiked, setIsLiked] = useState(false);
  const [isReg, setIsReg] = useState(false);

  const { user } = useAuthContext();
  const { id } = useParams();

  const [events, setEvents] = useState(null); // Initialize events state with null

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5001/events/${id}`);
      const json = await response.json();

      if (response.ok) {
        setEvents(json); // Set events state with fetched data
        console.log(json)
      } else {
        console.error('Failed to fetch events:', json); // Log error response
      }
    } catch (error) {
      console.error('Error fetching events:', error); // Log fetch error
    }
  };

  useEffect(() => {
    fetchEvents(); // Fetch events when component mounts
  }, [id]); // Fetch events whenever the id parameter changes

  useEffect(() => {
    // Update like status when events or user change
    if (events && user) {
      const likedUser = events.likes.some(like => like.toString() === user.user._id.toString());
      setIsLiked(likedUser);
      const regUser = events.registered.some(reg => reg.toString() === user.user._id.toString());
      setIsReg(regUser);
    }
  }, [events, user]);

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`http://localhost:5001/events/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: id, userId: user.user._id }),
      });
      if (response.ok) {
        fetchEvents(); // Refresh events after liking
        setIsLiked(!isLiked); // Toggle like status
        
      } else {
        console.error("Failed to like event");
      }
    } catch (error) {
      console.error("Error liking event:", error);
    }
  };

  const handleRegClick = async () => {
    try {
      const response = await fetch(`http://localhost:5001/events/${id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: id, userId: user.user._id }),
      });
      if (response.ok) {
        fetchEvents(); // Refresh events after liking
        setIsReg(!isReg); // Toggle like status
        
      } else {
        console.error("Failed to register event");
      }
    } catch (error) {
      console.error("Error registering event:", error);
    }

  };
  const [imi, setImi] = useState(false)
  const handleRegClick2 = async () => {
    try {
      const response = await fetch(`http://localhost:5001/users/registerUser/${user.user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Registration successful
        console.log("register successfull")
        console.log(user.user.registered)
        // console.log("registerUser", user.user.registered.toString())
        // Optionally, you can refresh the leaderboard or show a success message
      } else {
        // Registration failed
        console.error('Failed to register user');
        // Optionally, you can handle the error (e.g., show error message)
      }
      setImi(true )
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., show error message)
    }
  };
  



  console.log("reg", events)


  return (
    <>


      <Link to={"/"}>
        <button className="backBtn">
          <img src={prev} alt="next" />
        </button>
      </Link>

      {events && ( // Render only if events is not null or undefined
        <div className="box">
          <div className="shareBtn">
            <Sharebtn
              title="Check out this event!"
              url={window.location.href}
            />
          </div>
          <div className="poster">
            <img
              src={`http://localhost:5001/uploads/${events.poster}`}
              alt="contentImage"
            />
          </div>
          <div className="description">
          {/* <p className="delete" onClick={handleDelete}>Delete</p> */}
            <h1>{events.title}</h1>
            <h3>Description</h3>
            <p>{events.description}</p>
            <div className="event-info">
              <h3>Event Information:</h3>
              <p><strong>Date:</strong> {events.date}</p>
              <p><strong>Time:</strong> {events.time}</p>
              <p><strong>Venue:</strong> {events.venue}</p>
              <p><strong>Entry Fees:</strong> &#8377;{events.entryfees}</p>
              <div className="register-button">
                <button
                onClick={handleRegClick}
                >{isReg ? "Registered" : "Register Now"}</button>
                <button
                onClick={handleRegClick2}
                >{imi ? "Thank you" : "I am in"}</button>
              </div>
            </div>
          </div>
          <button
            className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={handleLikeClick}
          >
            <img src={isLiked ? liked : like} alt="like" />
            <p>{events.likes.length}</p>
          </button>
        </div>
      )}
    </>
  );
}

export default EventPage;
