import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import FindDoctor from "./FindADoctor";
import Contact from "./Contact";
import Services from "./Services";
import Home from "./Home";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
const NavbarComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar className="navbar">
            <h4>QuickRush</h4>
            <Container>
              <Nav className="me-auto ">
                <Nav.Link as={Link} to="/Home">
                  Home
                </Nav.Link>

                <Nav.Link as={Link} to="/About">
                  Find a doctor
                </Nav.Link>

                <Nav.Link as={Link} to="/Gallery">
                  Services
                </Nav.Link>

                <Nav.Link as={Link} to="/Contact">
                  Contact
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/About" element={<FindDoctor />}></Route>
          <Route path="/Gallery" element={<Services />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default NavbarComponent;
