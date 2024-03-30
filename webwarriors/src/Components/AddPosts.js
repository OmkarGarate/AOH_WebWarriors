import React, { useState } from 'react'
import '../css/addposts.css'
import { useAuthContext } from '../hooks/useAuthContext';
import defaultEvent from "../Images/defaultEvent.png";
import { Link } from 'react-router-dom';

function AddPosts({ap}) {

  const [post, setPost] = useState();
  const [postUrl, setPostUrl] = useState(defaultEvent)
  const [error, setError] = useState("");
  const [conf, setConf] = useState("");
  const {user} = useAuthContext()
  console.log(user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        formData.append("uploaded_file", post);

        const response = await fetch(`http://localhost:5001/users/postpic/${user.user._id}`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const json = await response.json();
            setError(json.error || "Failed to upload post");
        } else {
            setConf("Successfully uploaded post");
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        setError("Error during form submission. Please try again later.");
    }
};



  return (
    <>
   
      <form className='addPosts' style={ap} onSubmit={handleSubmit}
    encType="multipart/form-data"
    method="post">
      {/* <label htmlFor="uploadPost">

        <input type="file" id="uploadPost"/>

      </label> */}
       <Link to={'/profilePage'}>back</Link>
       <img src={postUrl === "" ? defaultEvent : postUrl} alt="" />
            <input
              type="file"
              className="form-control-file"
              name="uploaded_file"
              onChange={(e) => {
                setPost(e.target.files[0])
                setPostUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <button>Submit</button>
            {error=== "" ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
     </form>
    </>
  )
}

export default AddPosts