import React from 'react'
import Lae from './Lae'
import EventListing from './EventListing'
import Gallery from './Gallery'
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import HomeSlider from './HomeSlider';
import Footer from './Footer';
import Mosaicexpertise from './Mosaicexpertise';
import About from './About';
import CollegeListing from './CollegeListing';
import GalleryNew from './GalleryNew';
import EventRecommendation from './EventRecommendation';
import LeaderBoard from './LeaderBoard';


function Home() {
  
  return (
    <div>
        <Navbar/>
        <HomeSlider/>
        <EventRecommendation/>
        <LeaderBoard/>
        <EventListing/>
        {/* <Gallery/> */}
        {/* <GalleryNew/> */}
        <Lae/>
        {/* <Mosaicexpertise/> */}
        <CollegeListing/>
        <About/>
        <Footer/>
       
    </div>
  )
}

export default Home