// import React from "react";
import img1 from "../Images/Image1.jpg";
import img2 from "../Images/Image2.jpg";
import img3 from "../Images/Image3.jpg";
import img4 from "../Images/Image4.jpg";
import img5 from "../Images/Image5.jpg";
import img6 from "../Images/Image6.jpg";
import img7 from "../Images/Image7.jpg";
import img8 from "../Images/Image8.jpg";
import arrow from "../Images/prev.png";
import React, { useState } from "react";

function Mosaicexpertise() {

    const [slide, setSlide] = useState({
      transform: "translateX(0px)",
    });
    const [n, setN] = useState(1);
  
    const left = () => {
      const trs = n === 1 ? 0 : (n - 2) * -270;
      setN(n === 1 ? 1 : n - 1);
  
      setSlide({
        transform: `translateX(${trs}px)`,
      });
    };
  
    const rgt = () => {
      const trs = n === 4 ? (4 - 1) * -270 : n * -270;
      setN(n === 4 ? 4 : n + 1);
  
      setSlide({
        transform: `translateX(${trs}px)`,
      });
    }



  return (
    <div className="mosaicExp" id="colleges">
      <h4 className='miniTitle'>OUR COLLEGES</h4>
        <h1 className='l-head'>MOSAIC <strong>EXPERTIES</strong></h1>

      <div className="expertiseMain">
        <div className="sliderbtns">
        <div className="left sldBtn" onClick={left}>
            <img src={arrow} alt="arrow" />
          </div>
          <div className="right sldBtn" onClick={rgt}>
            <img src={arrow} alt="arrow" />
          </div>
        </div>
        <div className="expertiseWindow">
          <div className="expertiseAllImgs" style={slide}>
            <div className="one">
              <img src={img1}alt="img1" />
              <div className='smallbox'>
              <h4>Clg 1</h4>
              <p>Chembur</p>     
              </div>
            </div>
            <div className="one"> 
            <img src={img2}alt="img2" />
              <div className='smallbox'>
              <h4>Clg 2</h4>
              <p>Chembur</p>     
              </div>
              </div>
            <div className="one">
            <img src={img3}alt="img3" />
              <div className='smallbox'>
              <h4>Clg 3</h4>
              <p>Chembur</p>     
              </div>
            </div>
            <div className="one">
            <img src={img4}alt="img4" />
              <div className='smallbox'>
              <h4>Clg 4</h4>
              <p>Chembur</p>     
              </div>
            </div>
            <div className="one">
            <img src={img5}alt="img5" />
              <div className='smallbox'>
              <h4>Clg 5</h4>
              <p>Chembur</p>     
              </div>
            </div>
            <div className="one">
            <img src={img6}alt="img6" />
              <div className='smallbox'>
                <h4>Clg 6</h4>
                 <p>Chembur</p>             
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mosaicexpertise;
