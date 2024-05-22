// AdminNavbar.js
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import profile from "./images/dummy.webp";
import "./style.css";
const AdminNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const handleLogout = () => {
    setRole("null");
    navigate("/");
  };

  return (
    <Navbar className="navbar" expand="lg">
      <h4>QuickRush</h4>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/Admin/Dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/Admin/AddDoctor">
            Add Doctor
          </Nav.Link>
          <Nav.Link as={Link} to="/Admin/ViewDoctors">
            View Doctors
          </Nav.Link>
          <Nav.Link as={Link} to="/Admin/ViewPatients">
            View Patients
          </Nav.Link>

          <div style={{ position: "relative", bottom: "5px" }}>
            <img src={profile} alt="Profile" className="imgStyle" />
            <select
              onChange={handleLogout}
              style={{
                width: "200px",
                height: "40px",
                marginRight: "10px",
                background: "white",

                fontSize: "20px",
                border: "none",
                marginTop: "3px",
              }}
            >
              <option value="" disabled selected hidden>
                {username}
              </option>
              <option
                value="logout"
                style={{
                  background: "white",
                  color: "black",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Logout
              </option>
            </select>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
