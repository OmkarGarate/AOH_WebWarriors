import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

function CollegePosts() {

  const {user} = useAuthContext()
  const [allPosts, setAllPosts] = useState()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5001/users/getpic/${user.user._id}`);
        if (response.ok) {
          const json = await response.json();
          console.log(json)
          setAllPosts(json)
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  
    // if (user) {
      fetchPosts();
    // }
  }, [user]);
  


  return (
    <div>
      
      {allPosts && allPosts.map((post, index)=>(
        <div key={index}>
            <img src={`http://localhost:5001/uploadPic/${post}`} alt={`Post ${index}`} />
        </div>
      ))}
      
    </div>
  )
}

export default CollegePosts