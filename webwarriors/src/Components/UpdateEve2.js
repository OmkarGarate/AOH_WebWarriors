import React, { useEffect, useState } from "react";
import "../css/eventPage.css";
import eveImg from "../Images/Music-Festival-Poster-Design-1.jpg";
import prev from "../Images/prev.png";
import { Link, useParams } from "react-router-dom";
import Sharebtn from "./Sharebtn";
import like from "../Images/like.png";
import liked from "../Images/liked.png";
import { useAuthContext } from "../hooks/useAuthContext";

function UpdateEve2() {
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

  const { user } = useAuthContext();
  const { id } = useParams();

  const [events, setEvents] = useState(null); // Initialize events state with null

//   const
const handleDelete = async ()=>{
    if(!user){
      return
    }
    const response = await fetch(`http://localhost:5001/events/${id}`, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      }
    })
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
            {/* <label htmlFor="fileUpload"> */}
            {/* <img
            src={posterUrl === '' ? `http://localhost:5001/uploads/${events.poster}` : posterUrl}
              alt="contentImage"
            /> */}
            <img src={eveImg} alt="" />
            {/* </label> */}
            {/* <input type="file"
                className="form-control-file"
                id='fileUpload'
                name="uploaded_file"
                onChange={handleChange}/> */}
          </div>
          <form method="post" className="description" encType="multipart/form-data">
          <p className="delete" onClick={handleDelete}>Delete</p>
          <h3>Title</h3>
            <h1><input type="text" value={title} onChange={(e)=>setTitle(e.target.value)}/></h1>
            {/* {console.log(title)} */}
            <h3>Category</h3>
            <h1><input type="text" value={category} onChange={(e)=>setCategory(e.target.value)}/></h1>
            <h3>Description</h3>
            <p> <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}/></p>
            <div className="event-info">
              <h3>Event Information:</h3>
              <p><strong>Date:</strong><input type= "text" value={date} onChange={(e)=>setDate(e.target.value)}/></p>
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

export default UpdateEve2;
