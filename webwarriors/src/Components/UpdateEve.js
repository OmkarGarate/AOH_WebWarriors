import React, { useEffect, useState } from "react";
import "../css/eventPage.css";
import eveImg from "../Images/Music-Festival-Poster-Design-1.jpg";
import prev from "../Images/prev.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sharebtn from "./Sharebtn";
import like from "../Images/like.png";
import liked from "../Images/liked.png";
import { useAuthContext } from "../hooks/useAuthContext";

function UpdateEve() {
  // State to track whether the like button is clicked
  const [isLiked, setIsLiked] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [poster, setPoster] = useState('')
  const [category, setCategory] = useState('')
  const [posterUrl, setPosterUrl]= useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [conf, setConf] = useState('')
  const [entryfees, setEntryfees] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { id } = useParams();

  const [events, setEvents] = useState(null); // Initialize events state with null

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:5001/events/${id}`);
      const json = await response.json();

      if (response.ok) {
        setEvents(json); // Set events state with fetched data
        // console.log(json)
        setPoster(json.poster)
        setTitle(json.title)
        setCategory(json.category)
        setDescription(json.description)
        setDate(json.date)
        setTime(json.time)
        setVenue(json.venue)
        setEntryfees(json.entryfees)
      } else {
        console.error('Failed to fetch events:', json); // Log error response
      }
    } catch (error) {
      console.error('Error fetching events:', error); // Log fetch error
    }
  };

  console.log("id", id)

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

// console.log(user.token)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!category || !title || !description || !date || !time || !venue || !entryfees || !poster) {
      setError("Please fill in all the details.");
      return;
    }
    
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("venue", venue);
    formData.append("entryfees", entryfees);
    formData.append("poster", poster); // Make sure "poster" matches backend's expected field name

    try {
      const response = await fetch(`http://localhost:5001/events/update/${id}`, {
        method: "PATCH",
        body: formData
      });
    
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        throw new Error(errorData.error || "Failed to update event");
      }
    
      // Clear form fields and show success message
      setPoster("");
      setCategory("");
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setVenue("");
      setEntryfees("");
      setError("");
      setConf("Successfully updated event");
    
      // Fetch updated event details and update state
      fetchEvents();
    } catch (error) {
        setError(error)
      console.error("Error during form submission:", error.message);
      setError("Error during form submission. Please try again later.");
    }
  };
  
  const handleChange = (e) =>{

    if (e.target.name === "uploaded_file") {
                const file = e.target.files[0];
                if (file) {
                    setPoster(file);
                    setPosterUrl(URL.createObjectURL(file)); 
                }
            }
    }

      
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
            <label htmlFor="fileUpload">
            <img
            src={posterUrl === '' ? `http://localhost:5001/uploads/${events.poster}` : posterUrl}
              alt="contentImage"
            />
            </label>
            <input type="file"
                className="form-control-file"
                id='fileUpload'
                name="uploaded_file"
                onChange={handleChange}/>
          </div>
          <form method="post" className="description" onSubmit={handleSubmit} encType="multipart/form-data">
         
          <h3>Title</h3>
            <h1><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/></h1>
            {/* {console.log(title)} */}
            <h3>Category</h3>
            <h1><input type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/></h1>
            <h3>Description</h3>
            <p> <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
            <div className="event-info">
              <h3>Event Information:</h3>
              <p><strong>Date:</strong><input type="text" value={date} onChange={(e)=>setDate(e.target.value)}/></p>
              <p><strong>Time:</strong>  <input type="text" value={time} onChange={(e)=>setTime(e.target.value)}/></p>
              <p><strong>Venue:</strong>  <input type="text" value={venue} onChange={(e)=>setVenue(e.target.value)}/></p>
              <p><strong>Entry Fees:</strong> &#8377;<input type="text" value={entryfees} onChange={(e)=>setEntryfees(e.target.value)}/></p>
              <div className="register-button">
                <button>Update</button>
                {!error && error!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default UpdateEve;
