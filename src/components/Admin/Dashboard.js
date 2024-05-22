import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Dashboard = () => {
  const [numDoctors, setNumDoctors] = useState(0);
  const [numCheckedPatients, setNumCheckedPatients] = useState(0);
  const [numTodayAppointments, setNumTodayAppointments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch number of doctors
        const responseDoctors = await fetch("http://localhost:3168/doctors");
        if (!responseDoctors.ok) {
          throw new Error("Failed to fetch doctors data");
        }
        const doctorsData = await responseDoctors.json();
        setNumDoctors(doctorsData.length);

        // Fetch number of checked patients
        const responsePatients = await fetch(
          "http://localhost:3168/getAppointments"
        );
        if (!responsePatients.ok) {
          throw new Error("Failed to fetch patients data");
        }
        const patientsData = await responsePatients.json();
        console.log(patientsData);
        const checkedPatients = patientsData.filter(
          (patient) => patient.checked
        );
        setNumCheckedPatients(checkedPatients.length);

        // Format today's date in the UTC format
        const today = new Date().toISOString().split("T")[0] + "T00:00:00.000Z";

        // Filter appointments for today
        const todayAppointments = patientsData.filter(
          (patient) => patient.appointment_date === today
        );
        console.log("fetch data" + todayAppointments.appointment_date);
        setNumTodayAppointments(todayAppointments.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Number of Doctors</Card.Title>
              <Card.Text>{numDoctors}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Number of Checked Patients</Card.Title>
              <Card.Text>{numCheckedPatients}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Number of Today's Appointments</Card.Title>
              <Card.Text>{numTodayAppointments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
