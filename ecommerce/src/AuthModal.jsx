import React from "react";
import { Modal } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

function AuthModal({ show, handleClose, modalTitle, handleLoginSuccess }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
