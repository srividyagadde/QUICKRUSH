import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const EditDoctor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState({
    fullname: "",
    date_of_birth: "",
    qualification: "",
    specialist: "",
    email: "",
    phone_number: "",
    password: "",
  });

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await fetch(`http://localhost:3168/getDoctor/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch doctor");
      }
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3168/updateDoctor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });
      if (!response.ok) {
        throw new Error("Failed to update doctor");
      }
      navigate("/Admin/ViewDoctors");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Edit Doctor</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullname">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={doctor.fullname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="date_of_birth"
            value={doctor.date_of_birth}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="qualification">
          <Form.Label>Qualification</Form.Label>
          <Form.Control
            type="text"
            name="qualification"
            value={doctor.qualification}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="specialist">
          <Form.Label>Specialist</Form.Label>
          <Form.Control
            type="text"
            name="specialist"
            value={doctor.specialist}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone_number"
            value={doctor.phone_number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={doctor.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditDoctor;
