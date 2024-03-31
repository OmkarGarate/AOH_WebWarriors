import React, { useState, useRef, useEffect } from "react";
import "../css/signin.css";
import emailImg from "../Images/email.png";
import gmail_c from "../Images/gmail_c.png";
import google_c from "../Images/google_c.png";
import gmail_g from "../Images/gmail_g.png";
import google_g from "../Images/google_g.png";
import lock from "../Images/lock.png";
import unlock from "../Images/unlock.png";
import { isVisible } from "@testing-library/user-event/dist/utils";
import secretkey from "../Images/secretkey.png";
import useLoginCollege from "../hooks/useLoginCollege";
import useLoginStudent from "../hooks/useLoginStudent";
import { useNavigate } from "react-router-dom";


function Signin() {
  const [isVisible, setIsVisible] = useState(false);
  const [passInput, setPassInput] = useState("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const {loginUser, errorU, isLoadingU} = useLoginStudent()
  const {loginAdmin, error, isLoading} = useLoginCollege()
  const [errorM, setErrorM] = useState('');
  const [conf, setConf] = useState("");
  const navigate = useNavigate();

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
    if (value === "admin") {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };
  

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(isSelected){
      await loginAdmin(email, password, secretKey);
      if (!error) {
        // console.log('Exploring in as a User', email, password);
        setConf("Exploring In as a College");
        setErrorM(false)
        // setTimeout(() => {
          // navigate('/');
        // }, 1000);
      } else {
        setErrorM(error)
        console.log('Credentials not matching', errorU);
      }
    }else{
      await loginUser(email, password);
      if (!errorU ) {
        console.log('Exploring in as a User', email, password);
        setConf("Exploring In as a Student");
        setErrorM(false)
        // setTimeout(() => {
          // navigate('/');
        // }, 1000);
      } else {
        setErrorM(errorU)
        console.log('Credentials not matching', errorU);
      }
    }

    
  }

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
          <div className="sr_radioBtns">
            <div className="r_user">
              <input
                type="radio"
                name="userType"
                value="user"
                checked={!isSelected}
                onChange={() => handleRadioChange("user")}
              />{" "}
              Student
            </div>
            <div className="r_user">
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={isSelected}
                onChange={() => handleRadioChange("admin")}
              />{" "}
              College
            </div>
          </div>
          <form className="siInputs" onSubmit={handleSubmit}>
            <div
              className="siEmail secretkey"
              ref={secretkeyRef}
              style={{ display: isSelected ? "flex" : "none" }}
            >
              <img src={secretkey} alt="" />
              <input type="text" placeholder="Secret Key" onChange={(e)=>setSecretKey(e.target.value)}/>
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
              <button>SIGN IN</button>
              {!errorM ?(<div className="success">{conf}</div>) : (<div className="error">{errorM}</div>) }
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
