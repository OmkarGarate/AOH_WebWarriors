// import React, { useState } from 'react';
// import img1 from "../Images/collage-images/unnamed(2).jpeg";
// import img2 from "../Images/collage-images/unnamed (1).jpg";
// import img3 from "../Images/collage-images/unnamed(3).jpeg";
// import img4 from "../Images/collage-images/unnamed.jpg";
// import img5 from "../Images/collage-images/dy.jpeg";
// import img6 from "../Images/collage-images/sies.jpeg";

// function CollegeListing() {

//     const [showMore, setShowMore] = useState(false);
//     const [collegesToShow, setCollegesToShow] = useState(6);
//     const colleges = [
//         { id: 1, name: 'Bharati Vidyapeeth DET Kharghar', location: 'Kharghar', imageUrl: `${img1}`},
//         { id: 2, name: 'Bharati Vidyapeeth MU Kharghar', location: 'Kharghar', imageUrl: `${img2}` },
//         { id: 3, name: 'Pillai Collage Panvel', location: 'Kharghar', imageUrl: `${img3}` },
//         { id: 4, name: 'Bharati Vidyapeeth Pune', location: 'Kharghar', imageUrl: `${img4}` },
//         { id: 5, name: 'Dy Patil Pune', location: 'Kharghar', imageUrl: `${img5}` },
//         { id: 6, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: `${img6}` },
//         { id: 7, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: `${img6}` },
//         { id: 8, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: `${img6}` },
//         { id: 9, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: `${img6}` },
//         { id: 10, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: `${img6}` },
//       ];

//       // Display colleges based on the showMore state and collegesToShow value
//     const displayColleges = showMore ? colleges : colleges.slice(0, collegesToShow);

//     // Function to toggle between showing all and showing fewer colleges
//     const handleViewToggle = () => {
//         setShowMore(!showMore);
//         setCollegesToShow(showMore ? 6 : colleges.length);
//     };
//   return (
//     <>
//     <div className="collegeListing">
//       <h1 className='l-head'><strong>College</strong> Listing</h1>
//       <div className="college-grid">
//         {displayColleges.map(college => (
//           <div className="college-card" key={college.id}>
//             <img src={college.imageUrl} alt={college.name} className="college-image" />
//             <div className="college-info">
//               <h2>{college.name}</h2>
//               <p><strong> Location:</strong> {college.location}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {colleges.length > 6 && (
//                     <button className='vag' onClick={handleViewToggle}>
//                         {showMore ? 'View Less Colleges' : 'View All Colleges'}
//                     </button>
//                 )}
//     </div>
//     </>
//   )
// }

// export default CollegeListing





import React from 'react';
import img1 from "../Images/collage-images/unnamed(2).jpeg";
import img2 from "../Images/collage-images/unnamed (1).jpg";
import img3 from "../Images/collage-images/unnamed(3).jpeg";
import img4 from "../Images/collage-images/unnamed.jpg";
import img5 from "../Images/collage-images/dy.jpeg";
import img6 from "../Images/collage-images/sies.jpeg";
import { Link } from 'react-router-dom'

function CollegeListing() {

    const colleges = [
        { id: 1, name: 'Bharati Vidyapeeth DET Kharghar', location: 'Kharghar', imageUrl: img1},
        { id: 2, name: 'Bharati Vidyapeeth MU Kharghar', location: 'Kharghar', imageUrl: img2 },
        { id: 3, name: 'Pillai Collage Panvel', location: 'Kharghar', imageUrl: img3 },
        { id: 4, name: 'Bharati Vidyapeeth Pune', location: 'Kharghar', imageUrl: img4 },
        { id: 5, name: 'Dy Patil Pune', location: 'Kharghar', imageUrl: img5 },
        { id: 6, name: 'SIES Collage Nerul', location: 'Kharghar', imageUrl: img6 },
    ];

  return (
    <>
    <div className="collegeListing">
      <h1 className='l-head'><strong>College</strong> Listing</h1>
      <div className="college-grid">
        {colleges.map(college => (
          <div className="college-card" key={college.id}>
            <img src={college.imageUrl} alt={college.name} className="college-image" />
            <div className="college-info">
              <h2>{college.name}</h2>
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








