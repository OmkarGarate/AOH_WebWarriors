import React, { useState } from "react";
import "../css/createEvent.css";
import { Link } from "react-router-dom";
import prev from "../Images/prev.png";
import img1 from "../Images/Image1.jpg";
import createEventBg from "../Images/darkBG.avif";
import defaultEvent from "../Images/defaultEvent.png";
import { useAuthContext } from "../hooks/useAuthContext";

function CreateEvent() {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const { user } = useAuthContext();
  const [poster, setPoster] = useState(defaultEvent);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [entryfees, setEntryFees] = useState("");
  const [error, setError] = useState("");
  const [conf, setConf] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      !category ||
      !title ||
      !description ||
      !date ||
      !time ||
      !venue ||
      !entryfees ||
      !poster
    ) {
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
    formData.append("uploaded_file", poster);
    if (user) {
      formData.append("createdBy", user.user._id);
    }

    try {
      const response = await fetch("http://localhost:5001/events", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        setError(json.error || "Failed to create event");
      } else {
        setPoster(defaultEvent);
        setCategory(category);
        setTitle(title);
        setDescription(description);
        setDate(date);
        setTime(time);
        setVenue(venue);
        setEntryFees(entryfees);
        setError(error);
        setPosterUrl(posterUrl);
        setConf("Successfully created an event");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Error during form submission. Please try again later.");
    }
  };

  return (
    <div className="ceMain">
      <img src={createEventBg} alt="createEventBg" className="ceBg" />
      <div className="createEvent">
        <Link to={"/"}>
          <button className="backBtn">
            <img src={prev} alt="next" />
          </button>
        </Link>
        <h2>Create Event</h2>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          method="post"
        >
          <div className="evePoster">
            <img src={posterUrl === "" ? defaultEvent : posterUrl} alt="" />
            <input
              type="file"
              className="form-control-file"
              name="uploaded_file"
              onChange={(e) => {
                setPoster(e.target.files[0]);
                setPosterUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <div className="eventDesc">
            <div className="edi">
              <select className="categories" onChange={handleCategoryChange} value={category}>
                <option value="">Select Category</option>
                <option value="Cultural Events">Cultural Events</option>
                <option value="Sports">Sports</option>
                <option value="Technical">Technical</option>
                <option value="E-Sports">E-Sports</option>
                <option value="Placements">Placements</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="edi">
              Event Title:{" "}
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="edi">
              Description:{" "}
              <textarea
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div className="edi dnt">
              Date:{" "}
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              Time:{" "}
              <input
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
              />
            </div>
            <div className="edi">
              Venue:{" "}
              <input
                type="text"
                onChange={(e) => setVenue(e.target.value)}
                value={venue}
              />
            </div>
            <div className="edi">
              Entry Fees:{" "}
              <input
                type="text"
                onChange={(e) => setEntryFees(e.target.value)}
                value={entryfees}
              />
            </div>
            <button className="vag">Create</button>
            {error === "" ? (
              <div className="success">{conf}</div>
            ) : (
              <div className="error">{error}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
