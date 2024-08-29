import React from 'react';
import './components/aboutContectUs/AboutUs.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation




const AboutUs = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const scrollToTopAndRedirect = () => {
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Navigate to the home page ('/')
    navigate('/');
  };
  return (
    <div className='topbtn'>
    <div className="aboutcontainer">
      <h1 className="aboutheader">About Us</h1>
      <p className="aboutparagraph">
        Welcome to our e-commerce platform. We are committed to providing you with the best
        shopping experience. Our platform offers a wide range of products to cater to all your needs.
        Thank you for choosing us!
      </p>
      <button onClick={scrollToTopAndRedirect} className="scrollToTopButton">
        ↑
      </button>
    </div>
    </div>
  );
};

export default AboutUs;
