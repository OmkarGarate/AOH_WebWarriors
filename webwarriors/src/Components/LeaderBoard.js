import React, { useEffect, useState } from 'react'
import bglb from '../Images/bglb.jpg'
import gold from '../Images/gold.png'
import silver from '../Images/silver.png'
import bronze from '../Images/bronze.png'
import user from '../Images/user.png'
import sparkle from '../Images/sparkle.png'

function LeaderBoard() {
    const { user } = useAuthContext();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`http://localhost:5001/users/allusers`);
                if (response.ok) {
                    const eventsData = await response.json();
                    // Sort eventsData by registered count in descending order
                    eventsData.sort((a, b) => b.registered - a.registered);
                    // Select top 5 users
                    const topUsers = eventsData.slice(0, 5);
                    setEvents(topUsers);
                    
                } else {
                    console.error('Failed to fetch events data');
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);
    console.log("reg",events)

    const chunkSize = 3;
    const groupedEvents = Array.from(
        { length: Math.ceil(events.length / chunkSize) },
        (v, i) => events.slice(i * chunkSize, i * chunkSize + chunkSize)
    );
  return (
    <>
    <div className="leaderboardMain">
        {/* <img className='bglb' src={bglb} alt="" /> */}
        <div className="leaderBoard">
            {/* <img className='sparkle' src={sparkle} alt="" />
            <img className='sparkle2' src={sparkle} alt="" /> */}
            <h1>LEADERBOARD</h1>
            <h2></h2>
            <div className="lbContent">
            <div className="lbC1">
                <img src={gold} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserName</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <img src={silver} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserName</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <img src={bronze} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserName</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <p  className='rank'>4</p>
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserName</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <p  className='rank'>5</p>
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserName</p>
                    <p>1259</p>
                </div>
            </div>
            
        </div>
        </div>
        
    </div>
    </>
  )
}

export default LeaderBoard