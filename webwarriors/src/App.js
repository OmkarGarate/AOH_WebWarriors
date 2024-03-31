import React from 'react';
import './css/home.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrevEvents from './Components/PrevEvents';
import LiveEvents from './Components/LiveEvents';
import UpEvents from './Components/UpEvents';
import AllGallery from './Components/AllGallery';
import Home from './Components/Home';
import EventPage from './Components/EventPage';
import Profile from './Components/Profile';
import RegEvents from './Components/RegEvents';
import LikedEvents from './Components/LikedEvents';
import AboutMain from './Components/AboutMain';
import CollegeListing from './Components/CollegeListing';
import AllColleges from './Components/AllColleges';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import SRM from './Components/SRM';
import Toast from './Components/Toast';
import CreateEvent from './Components/CreateEvent';
import UpdateProfile from './Components/UpdateProfile';
import CollegePosts from './Components/CollegePosts';
import AddPosts from './Components/AddPosts';
import CreatedEve from './Components/CreatedEve';
import { useAuthContext } from './hooks/useAuthContext';
import ProfLive from './Components/ProfLive';
import ProfPrev from './Components/ProfPrev';
import ProfUp from './Components/ProfUp';
import SignupCollege from './Components/SignupCollege';
import EventRecommendation from './Components/EventRecommendation';
import UpdateEve from './Components/UpdateEve';
import UpdateEve2 from './Components/UpdateEve2';
import Category from './Components/Category'
import LeaderBoard from './Components/LeaderBoard';
import '../src/css/leaderboard.css'



function App() {

  const {user} = useAuthContext()

  return (
    <Router>
    <Routes>
      
      <Route path="/" element={<Home/>}>
        <Route path="prevEvents" element={<PrevEvents/>} />
        <Route path="/" element={<LiveEvents/>} />
        <Route path="upEvents" element={<UpEvents/>} />
      </Route>

      <Route path="/allGallery" element={<AllGallery/>}/>
      <Route path="/aboutMosaic" element={<AboutMain/>}/>
      <Route path="/eventPage/:id" element={<EventPage/>}/>
      <Route path="/srm" element={<SRM/>}/>
      <Route path="/signupcollege" element={<SignupCollege/>}/>
      <Route path="/createEvent" element={<CreateEvent/>}/>
      <Route path="/profilePage" element={<Profile/>}>
        {user && user.user.userType==="User" ? (
          <Route path='/profilePage' element={<RegEvents/>}/>
        ):(
          <Route path='/profilePage' element={<ProfLive/>}/>
        )}
        
        <Route path='likedEve' element={<LikedEvents/>}/>
        <Route path='clgposts' element={<CollegePosts/>}/>
        <Route path='addposts' element={<AddPosts/>}/>
        <Route path='profprev' element={<ProfPrev/>}/>
        <Route path='profup' element={<ProfUp/>}/>

        
      </Route>
        <Route path='/updateEve/:id' element={<UpdateEve/>}/>
      <Route path='/updateprofile' element={<UpdateProfile/>}/>
      {/* <Route path='/toast' element={<Toast/>}/> */}
      <Route exact path="/" element={<CollegeListing/>} />
      <Route exact path="/all-Colleges" element={ <AllColleges />} />

      {/* <Routes path='/category' element={<Category/>}/>
      <Routes path='/leaderboard' element={<LeaderBoard />}/> */}
    </Routes>
    
  </Router>
  );
}

export default App;

