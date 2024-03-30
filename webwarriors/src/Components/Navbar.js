import React, { useState } from 'react'
import logo1 from '../Images/logo1.png'
import profileImg from '../Images/profileImg.png'
import searchIcon from '../Images/searchIcon.png'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

function Navbar() {

    const [searchBox, setSearchBox] = useState({
        opacity: "0",
        top: "50px",
        width: "35px",
        zIndex: "-1"
    })

    const handleSearchBox = () =>{
        if(searchBox.opacity==="0")
        {
            setSearchBox({
                opacity: "1",
                zIndex: "1"
            })
    
            setTimeout(() => {
                setSearchBox({
                    top: "100px",
                    width: "440px"
                })
            }, 300);
        }else{
            
            setSearchBox({
                top: "50px",
                width: "35px"
            })
    
            setTimeout(() => {
                setSearchBox({
                    opacity: "0",
                    zIndex: "-1"
                })
            }, 300);
        }
    }

  return (
    <div className="navbarMain">
        <div className='navbar'>
        <img src={logo1} alt="logo1"className='logo'/>
        <ul className='navComps'>
            <li style={{color: "#ff3600"}}>HOME</li>
            <ScrollLink to='about' smooth={true} duration={500}><li>ABOUT US</li></ScrollLink>
            <ScrollLink to='events' smooth={true} duration={500}><li>EVENTS</li></ScrollLink>
            <ScrollLink to='gallery' smooth={true} duration={500}><li>GALLERY</li></ScrollLink>
            <ScrollLink to='colleges' smooth={true} duration={500}><li>COLLEGES</li></ScrollLink>
            <li className='pnsLink'>
                <Link className="pns" to={'/profilePage'}>
                    <img src={profileImg} alt="profileImg" />
                </Link>
                <div className="pns" onClick={handleSearchBox}>
                    <img src={searchIcon} alt="searchIcon" />
                </div>
            </li>
            {/* <li className='pns'><img src={profileImg} alt="profileImg" /></li>
            <li className='pns'><img src={searchIcon} alt="searchIcon" /></li> */}
        </ul>
        <input type="text" className='searchBox' placeholder='Search the Event' style={searchBox}/>

    </div>
    </div>
  )
}

export default Navbar