import React, { useState, useEffect } from 'react';
import '../css/profile.css';
import { Link, Outlet } from 'react-router-dom';
import prev from "../Images/prev.png";  
import profBg from '../Images/ems-imgs/sp-bg.jpg';
import profileImg from '../Images/ems-imgs/sd-pr.jpeg';
import { useAuthContext } from '../hooks/useAuthContext';
import profBgImg from '../Images/profBg.jpg'
import profileDefault from '../Images/profileDefault.png'
import plus from '../Images/plus.png'
import plusColor from '../Images/plusColor.png'
// import '../css/addposts.css'
import AddPosts from './AddPosts';
import LeaderBoard from './LeaderBoard';

function Profile() {
    const {user} = useAuthContext()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [userProfile, setUserProfile] = useState(profileDefault);
    const [userPoster, setUserPoster] = useState(profBgImg); 
    const [errorM, setErrorM] = useState(null)
    const [conf, setConf] = useState("");
    const [userData, setUserData] = useState()

    const [rnl, setRnl] = useState(user && user.user.userType === "User"? "reg" : "crt");
    const [apStyle, setApStyle] = useState({
        display: "none"
    })

    const handleEve = (e) => {
        setRnl(e);
        if(e === "addposts")
        {
            setApStyle({
                display: "flex"
            })
        }
    };


    useEffect(() => {
        const fetchData = async () =>{
          const response = await fetch(`http://localhost:5001/users/singleuser/${user.user._id}`)
          
          const json = await response.json()
        //   console.log(json)
          if(response.ok)
          {
            setUserData(json)
          }
          
        }
  
        if(user){
          fetchData()
        }

      }, [user])
      if(userData)
      {
          console.log("ud", userData)
      }

    return (
       <>
         <AddPosts ap={apStyle}/>
        <div className='profilePage'>
            <Link to={"/"}><button className='backBtn'><img src={prev} alt="next" /></button></Link>
            {/* <div className="prof1">
                <img src={userPoster} alt="profBg" className='profBg'/>
                <div className="profDesc">
                    <Link to={'/updateprofile'}><button>Edit profile</button></Link>
                    <img src={userProfile} alt="profileImg" className='profileImg usPrf'/>
                    <div className="prd">
                        <p className='username'>{username}</p>
                        <p className='userHandle'>{email}</p>
                        <p>{bio}</p>
                    </div>
                </div>
            </div> */}
            {userData ? 
            (<div className="prof1">
                <img src={userPoster} alt="profBg" className='profBg'/>
                {/* <img src={`http://localhost:5001/uploads2/${userData.userPoster}`} alt="contentImage" /> */}
                <div className="profDesc">
                    <Link to={'/updateprofile'}><button>Edit profile</button></Link>
                    {/* <img src={userProfile} alt="profileImg" className='profileImg usPrf'/> */}
                    <img src={`http://localhost:5001/uploads/${userData.userProfile}`} alt="profileImg" className='profileImg usPrf'/>
                    <div className="prd">
                        <p className='username'>{userData.username}</p>
                        <p className='userHandle'>{userData.email}</p>
                        <p>{userData.bio}</p>
                    </div>
                </div>
            </div>) : (null)
            }
            <div className="regnlik">
                {user && user.user.userType === "User" ? (
                    <Link to={'/profilePage'} onClick={() => handleEve('reg')}>
                    <button style={(rnl === 'reg') ? { backgroundColor: "#ff4d00", color: "white" } : { backgroundColor: "white", color: "#ff4d00" }}>
                        Registered Events
                    </button>
                </Link> 
                ):(null)}
                {user && user.user.userType === "User" ? (
                    <Link to={'likedEve'} onClick={() => handleEve('lik')}>
                    <button style={(rnl === 'lik') ? { backgroundColor: "#ff4d00", color: "white" } : { backgroundColor: "white", color: "#ff4d00" }}>
                        Liked Events
                    </button>
                </Link>
                ):(
                    null
                )}
            </div>
            
            <div className="rnlEvents">
                <Outlet/>
            </div>
        </div>
       </>
    );
}

export default Profile;
