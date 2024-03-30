import React from 'react'
import bglb from '../Images/bglb.jpg'
import gold from '../Images/gold.png'
import user from '../Images/user.png'

function LeaderBoard() {
  return (
    <>
    <div className="leaderboardMain">
        <img className='bglb' src={bglb} alt="" />
        <div className="leaderBoard">
            <h1>LEADERBOARD</h1>
            <h2></h2>
            <div className="lbContent">
            <div className="lbC1">
                <img src={gold} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserNmae</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <img src={gold} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserNmae</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <img src={gold} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserNmae</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <img src={gold} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserNmae</p>
                    <p>1259</p>
                </div>
            </div>
            <div className="lbC1">
                <img src={gold} alt="" />
                <img src={user} alt="" />
                <div className="uname">
                    <p>UserNmae</p>
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