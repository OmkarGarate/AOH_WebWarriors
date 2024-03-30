import React, { useState } from 'react';
import '../css/profile.css';
import { Link, Outlet } from 'react-router-dom';
import prev from "../Images/prev.png";  
import profBg from '../Images/ems-imgs/sp-bg.jpg';
import profileImg from '../Images/ems-imgs/sd-pr.jpeg';

function Profile() {
    const [rnl, setRnl] = useState('reg');

    const handleEve = (e) => {
        setRnl(e);
    };

    return (
        <div className='profilePage'>
            <Link to={"/"}><button className='backBtn'><img src={prev} alt="next" /></button></Link>
            <div className="prof1">
                <img src={profBg} alt="profBg" className='profBg'/>
                <div className="profDesc">
                    <button>Edit profile</button>
                    <img src={profileImg} alt="profileImg" className='profileImg'/>
                    <div className="prd">
                        <p className='username'>JOYBOY</p>
                        <p className='userHandle'>@monkey_d_luffy</p>
                        <p>I am gonna be the king of the pirates</p>
                    </div>
                </div>
            </div>
            <div className="regnlik">
                <Link to={'/profilePage'} onClick={() => handleEve('reg')}>
                    <button style={(rnl === 'reg') ? { backgroundColor: "#ff4d00", color: "white" } : { backgroundColor: "white", color: "#ff4d00" }}>
                        Registered Events
                    </button>
                </Link>
                <Link to={'likedEve'} onClick={() => handleEve('lik')}>
                    <button style={(rnl === 'lik') ? { backgroundColor: "#ff4d00", color: "white" } : { backgroundColor: "white", color: "#ff4d00" }}>
                        Liked Events
                    </button>
                </Link>
            </div>
            <div className="rnlEvents">
                <Outlet/>
            </div>
        </div>
    );
}

export default Profile;
