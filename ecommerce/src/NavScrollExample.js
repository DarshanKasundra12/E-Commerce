import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "./assets/C.jpg"; // Adjust the path to your logo

function NavScrollExample({ handleShow, isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    navigate(`/search?query=${query}`);
  };

  const handleMyCartClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      navigate('/cart');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // Clear the authentication token
    if (typeof onLogout === 'function') {
      onLogout(); // Call onLogout if it's a function
    }
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "50px",
              objectFit: "contain",
              mixBlendMode: "color-burn",
              padding: "5px",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              name="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
          <Button variant="outline-success" onClick={handleMyCartClick}>My Cart</Button>
          {isLoggedIn ? (
            <Button variant="outline-success" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button
              variant="outline-success"
              onClick={() => handleShow("Sign In")}
            >
              <FontAwesomeIcon icon={faUser} /> {/* Solid user icon */}
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
