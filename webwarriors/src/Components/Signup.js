import React, { useState, useRef, useEffect } from "react";
import "../css/signin.css";
import email from "../Images/email.png";
import gmail_c from "../Images/gmail_c.png";
import google_c from "../Images/google_c.png";
import gmail_g from "../Images/gmail_g.png";
import google_g from "../Images/google_g.png";
import lock from "../Images/lock.png";
import unlock from "../Images/unlock.png";
import user_g from "../Images/user_g.png";
import secretkey from "../Images/secretkey.png";

function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [passInput, setPassInput] = useState("password");

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setPassInput(isVisible ? "password" : "text");
  };

  const [isSelected, setIsSelected] = useState(false);

  const secretkeyRef = useRef(null);

  useEffect(() => {
    if (isSelected) {
      secretkeyRef.current.style.opacity = 1;
    } else {
      secretkeyRef.current.style.opacity = 0;
      // secretkeyRef.current.style.display = "none";
    }
  }, [isSelected]);

  const handleRadioChange = (value) => {
    if (value === 'admin') {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  return (
    <div className="signup">
      <div className="siHeading suHeading">
        <h1>Sign up</h1>
        <div className="twoBtn twoBtnn">
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

        <div className="sr_radioBtns">
          <div className="r_user">
            <input
              type="radio"
              name="userType"
              value="user"
              checked={!isSelected}
              onChange={() => handleRadioChange('user')}
            /> User
          </div>
          <div className="r_user">
            <input
              type="radio"
              name="userType"
              value="admin"
              checked={isSelected}
              onChange={() => handleRadioChange('admin')}
            /> Admin
          </div>
        </div>

        <div className="siInputs siInputss">
          <div className="siEmail secretkey" ref={secretkeyRef} style={{ display: isSelected ? 'flex' : 'none' }}>
            <img src={secretkey} alt="" />
            <input type="text" placeholder="Secret Key" />
          </div>
          <div className="siEmail">
            <img src={user_g} alt="" />
            <input type="username" placeholder="Username" />
          </div>
          <div className="siEmail">
            <img src={email} alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="siEmail">
            <div className="locks">
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
          <button>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
