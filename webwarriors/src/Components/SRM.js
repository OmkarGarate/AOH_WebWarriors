import React, { useState, useRef, useEffect } from "react";
import '../css/srm.css'
import plates from '../Images/plates.jpg'
import Signin from './Signin'
import Signup from './Signup'

function SRM() {
  const [abtInfo, setAbtInfo] = useState({
    abtTitle: "Welcome Back!",
    abtDesc: "Lorem ipsum dolor sit consectetur adipisicing elit.",
    abtBtn: "SIGN UP"
  });

  const [hFont, setHFont] = useState({
    fontSize: '2.6rem'
  })

  const [showSignUp, setShowSignUp] = useState(false);

  const srmWhiteRef = useRef(null);
  const srmColorRef = useRef(null);
  const srmContentRef = useRef(null);

  useEffect(() => {
    if (showSignUp) {
      srmWhiteRef.current.style.left = '68%';
      srmColorRef.current.style.left = '32%';
      srmContentRef.current.style.marginLeft = '0';
      srmContentRef.current.style.marginRight = '60px';
      setHFont({
        fontSize: '2.2rem'
      })
    } else {
      srmWhiteRef.current.style.left = '32%';
      srmColorRef.current.style.left = '68%';
      srmContentRef.current.style.marginLeft = '60px';
      srmContentRef.current.style.marginRight = '0';
      setHFont(
        {
          fontSize: '2.6rem'
        }
      )
    }
  }, [showSignUp]);

  const handleBtnclick = () => {
    const newAbtInfo = abtInfo.abtBtn === "SIGN UP" ? {
      abtTitle: "Create an account",
      abtDesc: "Lorem ipsum dolor sit consectetur adipisicing elit.",
      abtBtn: "SIGN IN"
    } : {
      abtTitle: "Welcome Back!",
      abtDesc: "Lorem ipsum dolor sit consectetur adipisicing elit.",
      abtBtn: "SIGN UP"
    };


      setTimeout(() => {
        setAbtInfo(newAbtInfo);
      }, 320);
      setShowSignUp(!showSignUp); 
  }

  return (
    <>
      <div className="srmMain">
        <div className="srm">
          <div className="srmWhite" ref={srmWhiteRef}>
            {showSignUp ? <Signup /> : <Signin />}
          </div>
          <div className="srmColor" ref={srmColorRef}>
            <img src={plates} alt="" />
            <div className="srmContent" ref={srmContentRef}>
              <div className="srmCtext">
                <h1 style={hFont}>{abtInfo.abtTitle}</h1>
                <p>{abtInfo.abtDesc}</p>
              </div>
              <div className="btnclick" onClick={handleBtnclick}>
                <button>{abtInfo.abtBtn}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SRM;
