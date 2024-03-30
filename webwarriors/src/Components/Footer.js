import React, { useState } from "react";
import thc3 from "../Images/footer-images/instagram/thumb-card3.png";
import thc4 from "../Images/footer-images/instagram/thumb-card4.png";
import thc5 from "../Images/footer-images/instagram/thumb-card5.png";
import thc6 from "../Images/footer-images/instagram/thumb-card6.png";
import thc7 from "../Images/footer-images/instagram/thumb-card7.png";
import thc8 from "../Images/footer-images/instagram/thumb-card8.png";
import { FontAwesomeIcon } from "react-fontawesome";
import insta from "../Images/footer-images/instagram-line.png";
import facebook from "../Images/footer-images/facebook-circle-line.png";
import twitter from "../Images/footer-images/twitter-x-line.png";
import youtube from "../Images/footer-images/youtube-line.png";
import env from "../Images/footer-images/env.png";
import location from "../Images/location.png";

// import { faFacebookF, faInstagram, faTwitter, faYoutube } from 'free-brands-svg-icons';

// Excel Sheet URl: https://docs.google.com/spreadsheets/d/1VkANVTLgK7HaDSGU60q7DcIQHM6jgcApW50TqZD5iiY/edit?usp=sharing
//https: script.google.com/macros/s/AKfycbzeZN5JqdRmUjK8TllMpEv-7FrQsMDBl1CHPUockJQYQy7UboM7BSKZFfFvYNBlFRSlrA/exec
function Footer() {
  
  const [showSuccess, setShowSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    try {
      // Make an API request to send form data to the server
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzeZN5JqdRmUjK8TllMpEv-7FrQsMDBl1CHPUockJQYQy7UboM7BSKZFfFvYNBlFRSlrA/exec",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Form submitted successfully");
        // Form submission was successful
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          // Reset form fields
          e.target.reset();
        }, 2000);
      } else {
        // Form submission failed
        throw new Error("Form submission failed");
      }
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
      // Optionally, you can display an error message to the user
      alert("There was an error submitting the form. Please try again later.");
    }
  };

  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="about-us" data-aos="fade-right" data-aos-delay="200">
            <h1>MOSAIC</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Veritatis, pariatur voluptate modi tempora distinctio nemo
              voluptatibus aliquid quod ut beatae.
            </p>
            <div className="connect-icons-1">
              <i className="fa-solid fa-location-dot">
                <img src={location} alt="location" />
                <span>Kharghar, Navi Mumbai</span>
              </i>
              <i className="fa-solid fa-envelope">
                <img src={env} alt="" />
                <span>mosaiceventsXX@gmail.com</span>
              </i>
            </div>
          </div>

          <div class="newsletter" data-aos="fade-right" data-aos-delay="200">
            <h1>CONTACT US</h1>
            <p>Write any Query or Feedback</p>
            <div class="form-element">
              <form name="submit-to-google-sheet" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="Name"
                  placeholder="Enter Your Name"
                  required
                />
                <input
                  type="email"
                  name="Email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  name="Message"
                  rows="4"
                  placeholder="Write Your Message"
                  required
                ></textarea>
                <button type="submit" nameName="btn">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>

          <div className="instagram" data-aos="fade-left" data-aos-delay="200">
            <h1>INSTAGRAM</h1>
            <div className="flex-row">
              <img src={thc3} alt="thc3" />
              <img src={thc4} alt="thc4" />
              <img src={thc5} alt="thc5" />
            </div>
            <div className="flex-row">
              <img src={thc6} alt="thc6" />
              <img src={thc7} alt="thc7" />
              <img src={thc8} alt="thc8" />
            </div>
            <p>
              Follow our instagram <span>#mosaic_events</span>
            </p>
          </div>
          <div className="follow" data-aos="fade-left" data-aos-delay="200">
            <h1>NETWORK</h1>
            <p>Let's Connect</p>
            <div className="connect-icons">
              <img src={insta} alt="" />
              <img src={facebook} alt="" />
              <img src={twitter} alt="" />
              <img src={youtube} alt="" />
            </div>
          </div>

          <div className="faqButton">
          <button className="vag">FAQ</button>
          
        </div>
        </div>

        <div className="copy-rights flex-row">
          <h4 className="text-gray">
            Copyrights &copy;2024 All rights reserved | <span>MOSAIC</span>
          </h4>
        </div>
      </footer>
      {/* Show success alert if showSuccess is true */}
      {showSuccess && (
        <div className="alert">
          <p>Your message has been successfully sent.</p>
        </div>
      )}
    </div>
  );
}

export default Footer;
