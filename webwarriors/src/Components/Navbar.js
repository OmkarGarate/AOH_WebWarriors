import React, { useState } from 'react'
import logo1 from '../Images/logo1.png'
import profileImg from '../Images/profileImg.png'
import plus from '../Images/plus.png'
import searchIcon from '../Images/searchIcon.png'
import { Link } from 'react-router-dom'
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useEffect } from 'react'

function Navbar() {

    const {user} = useAuthContext();
    const navigate = useNavigate()
    const {logout} = useLogout()
    console.log(user) 

    const [searchBox, setSearchBox] = useState({
        opacity: "0",
        top: "50px",
        width: "35px",
        zIndex: "-1"    
    })

  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [seStyle, setSeStyle] = useState({
    'height':'0'
  })

  useEffect(() => {
    const fetchEvents = async ()=>{
    const response = await fetch("http://localhost:5001/events/")
        const json = await response.json()

        if(response.ok){
            setEvents(json)
        }
    }
      fetchEvents()  
}, [])
// // console.log(searchQuery)


const filteredItems = Array.isArray(events) ? events.filter((item) =>
searchText === '' || !item.title ? false : item.title.toLowerCase().includes(searchText.toLowerCase())
) : [];

const handleSearch = (e) => {
    setSearchText(e.target.value);
    setSeStyle({
      height: "max-content"
    })
  };
    

    const handleSearchBox = () =>{
        if(searchBox.opacity==="0")
        {
            setSearchBox({
                opacity: "1",
                zIndex: "1"
            })
    
            setTimeout(() => {
                setSearchBox({
                    top: "70px",
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

    // const goToSrm = () =>{
    //     setTimeout(() => {
    //         navigate('/srm')
    //     }, 1000);
    // }
    const handleClick = () => {
        logout();
        localStorage.removeItem("user"); // Remove the user item from localStorage
        // setTimeout(() => {
        //   navigate('/srm');
        // }, 1000);
      };
  return (
    <div className="navbarMain">
        <div className='navbar'>
        <img src={logo1} alt="logo1"className='logo'/>
        <ul className='navComps'>
            <li style={{color: "#ff3600"}}>HOME</li>
            <ScrollLink to='events' smooth={true} duration={500}><li>EVENTS</li></ScrollLink>
            <ScrollLink to='colleges' smooth={true} duration={500}><li>COLLEGES</li></ScrollLink>
            <ScrollLink to='about' smooth={true} duration={500}><li>ABOUT US</li></ScrollLink>
            <ScrollLink to='contactus' smooth={true} duration={500}><li>CONTACT US</li></ScrollLink>
            <li className='pnsLink'> 
                {user && user.user.userType === "College"? (
                    <Link className="pns" to={'/createEvent'}>
                    <img src={plus} alt="profileImg" />
                </Link>
                ):(null)}
                <Link className="pns" to={'/profilePage'}>
                    <img src={profileImg} alt="profileImg" />
                </Link>
                <div className="pns" onClick={handleSearchBox}>
                    <img src={searchIcon} alt="searchIcon" />
                </div>
            </li>
            {user?(
                <Link className='pns vag' onClick={handleClick}>Logout</Link>
            ):(
                <Link to={'/srm'} className='pns vag'>LogIn</Link>
            )}
            
            {/* <li className='pns'><img src={profileImg} alt="profileImg" /></li>
            <li className='pns'><img src={searchIcon} alt="searchIcon" /></li> */}
        </ul>
        <input type="text" className='searchBox' placeholder='Search the Event' style={searchBox}
        onChange={handleSearch} value={searchText || ''}
        />
        <ul className='searchedEle' style={seStyle}>
        {filteredItems.map((item) => (
          <Link key={item?._id} to={`/eventPage/${item._id}`}>
            <li>
              {item?.title}
            </li>
          </Link>
        ))}
      </ul>

    </div>
    
    </div>
  )
}

export default Navbar