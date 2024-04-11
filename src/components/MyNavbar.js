import React from "react";
import Nav from "react-bootstrap/Nav";
import Home from "./Home";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import DoctorLogin from "./DoctorLogin";
import UserRegister from "./UserRegister";

const NavbarComponent = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Navbar className="navbar" expand="lg">
            <h4>QuickRush</h4>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/Admin">
                  Admin
                </Nav.Link>

                <Nav.Link as={Link} to="/Doctor">
                  Doctor
                </Nav.Link>

                <Nav.Link as={Link} to="/User">
                  User
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/User" element={<UserLogin />}></Route>
          <Route path="/Admin" element={<AdminLogin />}></Route>
          <Route path="/Doctor" element={<DoctorLogin />}></Route>
          <Route path="/UserRegister" element={<UserRegister />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default NavbarComponent;
