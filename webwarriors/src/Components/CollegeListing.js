import React, { useEffect, useState } from 'react';
import img1 from "../Images/collage-images/unnamed(2).jpeg";
import img2 from "../Images/collage-images/unnamed (1).jpg";
import img3 from "../Images/collage-images/unnamed(3).jpeg";
import img4 from "../Images/collage-images/unnamed.jpg";
import img5 from "../Images/collage-images/dy.jpeg";
import img6 from "../Images/collage-images/sies.jpeg";
import { Link } from 'react-router-dom'
import profileDefault from '../Images/profileDefault.png'

function CollegeListing() {

    const [colleges, setColleges] = useState()
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5001/users/allusers');
          const json = await response.json();
    
          // Sort users based on a timestamp or ID indicating when the user was created
          const sortedUsers = json.sort((a, b) => {
            // Assuming users have a property 'createdAt' indicating the creation time
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
    
          // Get the first 6 users
          const latestUsers = sortedUsers.filter(college => college.userType === "College").reverse().slice(0, 6);
    
          if (response.ok) {
            setColleges(latestUsers);
          }
        } catch (error) {
          console.error('Error fetching latest users:', error);
        }
      };
    
      fetchData();
    }, []);
     

    console.log("colleges:",colleges)
    

    // const colleges = [
    //     { id: 1, name: 'Bharati Vidyapeeth DET Kharghar', location: 'Kharghar', imageUrl: img1},
    //     { id: 2, name: 'Bharati Vidyapeeth MU Kharghar', location: 'Kharghar', imageUrl: img2 },
    //     { id: 3, name: 'Pillai Collage Panvel', location: 'Kharghar', imageUrl: img3 },
    //     { id: 4, name: 'Bharati Vidyapeeth Pune', location: 'Kharghar', imageUrl: img4 },
    //     { id: 5, name: 'Dy Patil Pune', location: 'Kharghar', imageUrl: img5 },
    //     { id: 6, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: img6 },
    // ];

  return (
    <>
    <div className="collegeListing" id='colleges'>
      <h1 className='l-head'><strong>College</strong> Listing</h1>
      <div className="college-grid">
        {colleges && Object.values(colleges).map(college => (
          <div className="college-card" key={college._id}>
            {/* <img src={college.imageUrl} alt={college.name} className="college-image" /> */}
            <img src={userProfile === '' ? `http://localhost:5001/uploads/${college.userProfile}` : profileDefault} alt="profileImg" className='college-image'/>
            <div className="college-info">
              <h2>{college.username.toUpperCase()}</h2>
              <p><strong> Location:</strong> {college.location}</p>
            </div>
          </div>
        ))}
      </div>

       <Link to={"/all-Colleges"} className='agLink'><button className="vag">VIEW ALL</button></Link>
    </div>
    </>
  )
}

export default CollegeListing;








