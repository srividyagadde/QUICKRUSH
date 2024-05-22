import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    fetch("http://localhost:3168/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullname, email, password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        toast.success("Registered Successfully");
        // Clear form fields after successful registration
        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/User");
        }, 3168);
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Register failed. Please try again.");
      });
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="register-container">
      <h2 className="title">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="fullname"
              label="Fullname"
              variant="outlined"
              placeholder="Enter Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="form-control input-field"
              required
            />
          </div>
          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control input-field"
              required
            />
          </div>

          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control input-field"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          </div>

          <div style={{ paddingBottom: "10px" }}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control input-field"
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
