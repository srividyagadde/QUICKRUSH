import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AdminLogin from "./AdminLogin";
import DoctorLogin from "./DoctorLogin";
import UserLogin from "./UserLogin";
import UserRegister from "./UserRegister";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import AdminNavbar from "./AdminNavbar";
import PatientNavbar from "./UserNavbar";
import DoctorNavbar from "./DoctorNavbar";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const DefaultNavbar = () => (
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
);

const NavbarComponent = () => {
  const [role, setRole] = useState(null);

  return (
    <div>
      <BrowserRouter>
        <div>
          {role === null && <DefaultNavbar />}
          {role === "admin" && <AdminNavbar setRole={setRole} />}
          {role === "doctor" && <DoctorNavbar setRole={setRole} />}
          {role === "patient" && <PatientNavbar setRole={setRole} />}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminLogin setRole={setRole} />} />
          <Route path="/Doctor" element={<DoctorLogin setRole={setRole} />} />
          <Route path="/User" element={<UserLogin setRole={setRole} />} />
          <Route
            path="/UserRegister"
            element={<UserRegister setRole={setRole} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default NavbarComponent;
