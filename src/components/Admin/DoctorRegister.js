import React, { useState } from "react";
import "./DoctorRegister.css";

const DoctorRegister = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    date_of_birth: "",
    qualification: "",
    specialist: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3168/addDoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register doctor");
      }

      // If registration is successful, reset form fields
      setFormData({
        fullname: "",
        date_of_birth: "",
        qualification: "",
        specialist: "",
        email: "",
        phone_number: "",
        password: "",
      });

      alert("Doctor registered successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Doctor registration failed. Please try again.");
    }
  };

  return (
    <div className="doctor-register-container">
      <h2 className="form-title">Doctor Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            id="fullname"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            id="date_of_birth"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            id="qualification"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="specialist">Specialist:</label>
          <input
            type="text"
            name="specialist"
            value={formData.specialist}
            onChange={handleChange}
            id="specialist"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            id="phone_number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn-register">
          Register
        </button>
      </form>
    </div>
  );
};

export default DoctorRegister;
