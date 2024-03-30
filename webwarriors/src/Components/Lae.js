import React from 'react'
import ImageSlider from './ImageSlider'
import img1 from '../Images/Image1.jpg'
import img2 from '../Images/Image2.jpg'
import img3 from '../Images/Image3.jpg'
import img4 from '../Images/Image4.jpg'
import img5 from '../Images/Image5.jpg'
import img6 from '../Images/Image6.jpg'
import img7 from '../Images/Image7.jpg'
import img8 from '../Images/Image8.jpg'

function Lae() {
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8
    ]
    
  return (
    <div className='lae'>
        <h4 className='miniTitle'>UPCOMING EVENTS</h4>
        <h1 className='l-head'>Latest <strong>Awesome Events</strong></h1>
        <ImageSlider images={images}/>
    </div>
  )
}

export default Lae