// PatientNavbar.js
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const PatientNavbar = ({ setRole }) => {
  return (
    <Navbar className="navbar" expand="lg">
      <h4>QuickRush</h4>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/FindDoctor">
            Find a Doctor
          </Nav.Link>
          <Nav.Link as={Link} to="/Services">
            Services Provided by Hospital
          </Nav.Link>
          <Nav.Link as={Link} to="/Contact">
            Contact
          </Nav.Link>
          <Nav.Link onClick={() => setRole(null)}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PatientNavbar;
