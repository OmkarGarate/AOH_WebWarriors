import React, { useState } from "react";
import "../css/signin.css";
import email from "../Images/email.png";
import gmail_c from "../Images/gmail_c.png";
import google_c from "../Images/google_c.png";
import gmail_g from "../Images/gmail_g.png";
import google_g from "../Images/google_g.png";
import lock from "../Images/lock.png";
import unlock from "../Images/unlock.png";
import { isVisible } from "@testing-library/user-event/dist/utils";

function Signin() {
  const [isVisible, setIsVisible] = useState(false);
  const [passInput, setPassInput] = useState("password");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setPassInput(isVisible ? "password" : "text");
  };

  return (
    <>
      <div className="signin">
        <div className="siHeading">
          <h1>Sign in</h1>
          <div className="twoBtn">
            <div className="google">
              <img className="google_c" src={google_c} alt="" />
              <img className="google_g" src={google_g} alt="" />
            </div>
            <div className="gmail">
              <img className="gmail_c" src={gmail_c} alt="" />
              <img className="gmail_g" src={gmail_g} alt="" />
            </div>
          </div>
          <p>Or</p>
          <div className="siInputs">
            <div className="siEmail">
              <img src={email} alt="" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="siEmail">
              <div className="locks">
                {/* {isVisible ? 
              <img src={unlock} alt="" onClick={uClick} />
              : <img src={lock} alt="" onClick={lClick}/> 
              } */}

                <img
                  src={isVisible ? unlock : lock}
                  alt=""
                  onClick={toggleVisibility}
                />
              </div>
              <input type={passInput} placeholder="Password" />
            </div>
          </div>

          <div className="siBtn">
            <button>SIGN IN</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
