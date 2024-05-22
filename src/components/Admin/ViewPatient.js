import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./ViewPatient.css";

const ViewPatientList = () => {
  const headings = [
    "Patient Name",
    "Age",
    "Gender",
    "Appointment Date",
    "Appointment Time",
    "Checked",
  ];

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Initialize with today's date
  );

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch("http://localhost:3168/getAppointments");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Format today's date in the appointment_date format
        const formattedDate = new Date(selectedDate).toISOString();
        // Filter appointments based on the formatted date
        const filteredByDate = data.filter(
          (appointment) => appointment.appointment_date === formattedDate
        );
        setDetails(filteredByDate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  let message = "";
  if (selectedDate === new Date().toISOString().split("T")[0]) {
    message = details.length === 0 ? "No appointments for today" : "";
  } else {
    message = details.length === 0 ? "No appointments for selected date" : "";
  }

  return (
    <div style={{ width: "60%", textAlign: "center", margin: "auto" }}>
      <div className="row justify-content-end ms-6 ">
        <div className="col-md-4">
          <Form controlId="datePicker">
            <Form.Group>
              <Form.Label>
                Select Date:
                <Form.Control
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="form-control"
                />
              </Form.Label>
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="row mt-3 table-container">
        <div className="col">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : details.length === 0 ? (
            <p className="text-center">{message}</p>
          ) : (
            <Table striped bordered hover variant="dark" className="table">
              <thead>
                <tr>
                  {headings.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {details.map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.patientname}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.appointment_date}</td>
                    <td>{patient.appointment_time}</td>
                    <td>{patient.checked ? "Checked" : "Unchecked"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPatientList;
