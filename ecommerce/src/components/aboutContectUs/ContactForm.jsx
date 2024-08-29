  // import React, { useState } from 'react';
  // import '../aboutContectUs/ContactForm.css'; // Import CSS file

  // const ContactForm = () => {
  //   const [formData, setFormData] = useState({
  //     name: '',
  //     email: '',
  //     message: ''
  //   });

  //   const [responseMessage, setResponseMessage] = useState('');

  //   const handleChange = (e) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  //   const scrollToTop = () => {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: 'smooth'
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const response = await fetch('http://localhost:5000/api/contact', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //       });

        
        

  //       const result = await response.json();

  //       if (response.ok) {
  //         setResponseMessage('Form submitted successfully');
  //         setFormData({ name: '', email: '', message: '' });
  //       } else {
  //         setResponseMessage('Failed to submit form');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setResponseMessage('Failed to submit form');
  //     }
  //   };

  //   return (
  //     <div>
  //     <form onSubmit={handleSubmit} className='Contactform'>
  //       <h1><center>Contact Us</center></h1>
  //       <input
  //         className='ContactInp'
  //         type="text"
  //         name="name"
  //         placeholder="Your Name"
  //         value={formData.name}
  //         onChange={handleChange}
  //       />
  //       <input
  //         className='ContactInp'
  //         type="email"
  //         name="email"
  //         placeholder="Your Email"
  //         value={formData.email}
  //         onChange={handleChange}
  //       />
  //       <textarea
  //         className='ContactInp'
  //         name="message"
  //         placeholder="Your Message"
  //         value={formData.message}
  //         onChange={handleChange}
  //       ></textarea>
  //       <button type="submit">Submit</button>
  //       {responseMessage && <p>{responseMessage}</p>}
  //     </form>
  //     <button onClick={scrollToTop} className="scrollToTopButton">
  //     ↑
  //   </button>
  //   </div>
  //   );
  // };

  // export default ContactForm;

  import React, { useState } from 'react';
  import '../aboutContectUs/ContactForm.css'; // Import CSS file
  import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
  
  const ContactForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3001/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          setResponseMessage('Form submitted successfully');
          setFormData({ name: '', email: '', message: '' });
        } else {
          setResponseMessage('Failed to submit form');
        }
      } catch (error) {
        console.error('Error:', error);
        setResponseMessage('Failed to  not submit form');
      }
    };
  
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
      <div>
        <form onSubmit={handleSubmit} className='Contactform'>
          <h1><center>Contact Us</center></h1>
          <input
            className='ContactInp'
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className='ContactInp'
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            className='ContactInp'
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Submit</button>
          {responseMessage && <p>{responseMessage}</p>}
        </form>
        <button onClick={scrollToTopAndRedirect} className="scrollToHome">
          ↑
        </button>
      </div>
    );
  };
  
  export default ContactForm;
  