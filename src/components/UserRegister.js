import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    fullname: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    fetch(
      "https://glorious-spoon-x5rq54wr4vg4f6rqr-3168.app.github.dev/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(formData);
        toast.success("Registered Successfully");
        setTimeout(() => {
          navigate("/User");
        }, 3168);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Register failed. Please try again.");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  return (
    <div className="register-container">
      <h2 className="title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Fullname"
              variant="outlined"
              placeholder="Enter Fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className=" form-control input-field"
              required
            />
          </div>
          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control input-field"
              required
            />
          </div>

          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className=" form-control input-field"
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Register
          </button>
          <Link to="/User" className="btn btn-link">
            Back to Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserRegister;
