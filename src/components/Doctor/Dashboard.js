import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

function DoctorDashboard() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [checkedPatientsCount, setCheckedPatientsCount] = useState(0);

  useEffect(() => {
    // Fetch data from the URL
    fetch("http://localhost:3168/getAppointments")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        // Get doctor's name from session storage
        const storedDoctorName = localStorage.getItem("doctorName");
        if (!storedDoctorName) {
          throw new Error("Doctor name not found in Local storage");
        }

        // Filter data based on the doctor's name
        const doctorPatients = data.filter(
          (patient) => patient.doctor === storedDoctorName
        );

        // Count the number of patients
        const patientsCount = doctorPatients.length;
        setPatientsCount(patientsCount);

        // Count the number of checked patients
        const checkedPatients = doctorPatients.filter(
          (patient) => patient.checked
        );
        setCheckedPatientsCount(checkedPatients.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <Card style={{ width: "18rem", marginBottom: "20px" }}>
        <Card.Body>
          <Card.Title>Total Patients</Card.Title>
          <Card.Text>{patientsCount}</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Checked Patients</Card.Title>
          <Card.Text>{checkedPatientsCount}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DoctorDashboard;
