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
import LeaderBoard from './Components/LeaderBoard';
import '../src/css/leaderboard.css'





function App() {
  
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
      <Route path="/eventPage" element={<EventPage/>}/>
      <Route path="/srm" element={<SRM/>}/>
      <Route path="/profilePage" element={<Profile/>}>
        <Route path='/profilePage' element={<RegEvents/>}/>
        <Route path='likedEve' element={<LikedEvents/>}/>
      </Route>
      <Route exact path="/" element={CollegeListing} />
      <Route exact path="/all-Colleges" element={ <AllColleges />} />
  
      <Route path="/leaderboard" element={<LeaderBoard/>}/>
    </Routes>
    
  </Router>
  );
}

export default App;

