import React, { useEffect, useState } from 'react';
import '../css/profile.css';
import { Link, Outlet } from 'react-router-dom';
import prev from "../Images/prev.png";  
import profBg from '../Images/ems-imgs/sp-bg.jpg';
import profileImg from '../Images/ems-imgs/sd-pr.jpeg';
import { useAuthContext } from '../hooks/useAuthContext';
import profBgImg from '../Images/profBg.jpg'
import profileDefault from '../Images/profileDefault.png'
import useSignup from "../hooks/useSignup";

function SignupCollege() {
    const {user} = useAuthContext()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const [bio, setBio] = useState('')
    const [userType, setUserType] = useState('College')
    const [location, setLocation] = useState('')
    const [userProfile, setUserProfile] = useState(profileDefault);
    const [userPoster, setUserPoster] = useState(profBgImg); 
    const [errorM, setErrorM] = useState(null)
    const [conf, setConf] = useState("");
    const [userData, setUserData] = useState()
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        console.log("data", username, email, pass, userType, secretKey )
        await signup(username, email, pass, userType, secretKey);

        if(!error){
          setConf("Successfully Registered!!")
        }

      };

      const handleChange = (e) => {
        if (e.target.name === "uploaded_file") {
            const file = e.target.files[0];
            if (file) {
                setUserProfile(file);
                setUserPoster(URL.createObjectURL(file)); // Optionally set a preview of the selected file
            }
        }
    };
    
    
    
    return (
        <div className='profilePage signupClg'>
            {/* <Link to={"/srm "}><button className='backBtn'><img src={prev} alt="next" /></button></Link> */}
            <form className="prof1" onSubmit={handleSubmit} encType="multipart/form-data"
        method="post">
                <div className="profDesc">
                    <div className="prfImg">
                        {/* <img src={posterUrl === "" ? defaultEvent : posterUrl} alt="" /> */}
                        <img src={userPoster} alt="profileImg" className='profileImg'/>
                        
                    </div>
                    <div className="prd">
                        <label htmlFor="username">Username: </label>
                        <input type='text' className='username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <label htmlFor="email">Email:</label>
                        <input type='text'  className='userHandle' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="password">Password:</label>
                        <input type='password'  className='userHandle' value={pass} onChange={(e)=>setPass(e.target.value)}/>
                        <label htmlFor="secretKey">Secret Key:</label>
                        <input type='text'  className='userHandle' value={secretKey} onChange={(e)=>setSecretKey(e.target.value)}/>

                    </div>
                </div>
                <div className="fsb">
                <button className="vag">Save</button>
                {!errorM && errorM!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{errorM}</div>) }
                </div>
            </form>
        </div>
    );
}

export default SignupCollege;
