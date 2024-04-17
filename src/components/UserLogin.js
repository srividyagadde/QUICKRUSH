import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserLogin.css";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLogin({ setRole }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://glorious-spoon-x5rq54wr4vg4f6rqr-3168.app.github.dev/users")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((users) => {
        const user = users.find(
          (user) =>
            user.email === formData.email && user.password === formData.password
        );
        if (user) {
          console.log(formData);
          setRole("patient");
          toast.success("Login Successful");
        } else {
          toast.error("Invalid email or password!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Login Failed");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div className="container">
      <h2 className="title">User Login</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <div className="col-md-12 input-field">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="form-control "
              name="email"
              value={formData.email}
              placeholder="Enter Email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="col-md-12 input-field">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              className="form-control  "
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          Login
        </button>
        <Link to="/UserRegister" className="btn btn-link">
          Register
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
