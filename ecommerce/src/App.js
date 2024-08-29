import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Home from './components/home';
import Product from './components/product';
import ProductDisplay from './components/productDisplay';
import NavScrollExample from "./NavScrollExample";
import AboutUs from "./AboutUs";
import ContactUsPage from "./ContactUsPage";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import UncontrolledExample from "./UncontrolledExample";
import UserOrder from "./components/Order.jsx";
import SearchResults from "./components/SearchResults.jsx";

function ScrollToDown() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/about" || pathname === "/contact") {
      window.scrollTo(0, 500);
    }
  }, [pathname]);

  return null;
}

function App() {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState("Sign In");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUncontrolled, setShowUncontrolled] = useState(true);

  const handleShow = (content) => {
    setModalContent(content);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access_token");
  };

  return (
    <div className="App">
      <NavScrollExample handleShow={handleShow} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      {showUncontrolled && <UncontrolledExample />}
      
      <Modal show={show} onHide={handleClose}>
        {modalContent === "Sign In" && <Login onLoginSuccess={handleLoginSuccess} />}
        {modalContent === "Sign Up" && <Signup />}
      </Modal>

      <ScrollToDown />

      <Routes>
        <Route path="/" element={<Home setShowUncontrolled={setShowUncontrolled} />} />
        <Route path="/products/:category" element={<Product />} />
        <Route path="/product/:id" element={<ProductDisplay />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/order" element={<UserOrder />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
