import React, { useState, useRef, useEffect } from "react";
import "../css/signin.css";
import emailImg from "../Images/email.png";
import gmail_c from "../Images/gmail_c.png";
import google_c from "../Images/google_c.png";
import gmail_g from "../Images/gmail_g.png";
import google_g from "../Images/google_g.png";
import lock from "../Images/lock.png";
import unlock from "../Images/unlock.png";
import user_g from "../Images/user_g.png";
import secretkey from "../Images/secretkey.png";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [passInput, setPassInput] = useState("password");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const userType = "User"
  const secretKey=""

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    setPassInput(isVisible ? "password" : "text");
  };

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    await signup(username, email, password, userType, secretKey);

    if(!error){
      setConf("Successfully Registered!!")
    }
  }

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

        <form className="siInputs siInputss" onSubmit={handleSubmit}>
          <div className="siEmail">
            <img src={user_g} alt="" />
            <input type="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="siEmail">
            <img src={emailImg} alt="" />
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="siEmail">
            <div className="locks">
              <img
                src={isVisible ? unlock : lock}
                alt=""
                onClick={toggleVisibility}
              />
            </div>
            <input type={passInput} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className="siBtn">
            <button>SIGN UP</button>
            {!error && error!= '' ?(<div className="success">{conf}</div>) : (<div className="error">{error}</div>) }
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
