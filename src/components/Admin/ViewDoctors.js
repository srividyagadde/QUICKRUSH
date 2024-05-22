import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State variable to track selected doctor
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:3168/doctors");
      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (doctorId) => {
    navigate(`/Admin/edit-doctor/${doctorId}`);
  };

  const handleDelete = async (doctorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3168/deleteDoctor/${doctorId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete doctor");
        }
        fetchDoctors();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleDisplayDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsModal(true);
  };

  return (
    <div style={{ width: "80%", textAlign: "center", margin: "auto" }}>
      <h2>View Doctors</h2>
      <Table bordered hover variant="success">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialist</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td>{doctor.fullname}</td>
              <td>{doctor.specialist}</td>
              <td>{doctor.email}</td>
              <td>{doctor.phone_number}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(doctor._id)}>
                  Edit
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleDisplayDetails(doctor)} // Pass the selected doctor to the function
                >
                  Display
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(doctor._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display doctor details */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Doctor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <div>
              <p>Name: {selectedDoctor.fullname}</p>
              <p>Specialist: {selectedDoctor.specialist}</p>
              <p>Email: {selectedDoctor.email}</p>
              <p>Phone Number: {selectedDoctor.phone_number}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDetailsModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminViewDoctors;
