import React from 'react';
import ContactForm from './components/aboutContectUs/ContactForm'; // Adjusted import path
import ContactDetails from './components/aboutContectUs/ContactDetails';
import './components/aboutContectUs/ContactForm.css'

const ContactUsPage = () => {
  return (
    <div>
      <ContactForm />
      <ContactDetails />
    </div>
  );
};

export default ContactUsPage;
