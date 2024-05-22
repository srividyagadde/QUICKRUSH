import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import "./DoctorPatientList.css"; // Import the CSS file

const DoctorPatientList = () => {
  const headings = [
    "Patient Name",
    "Age",
    "Gender",
    "Appointment Date",
    "Appointment Time",
    "Checked", // New column for marking appointments as checked
  ];

  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // State for selected date, default to today
  const doctorName = localStorage.getItem("doctorName");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch("http://localhost:3168/getAppointments");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Filter the data based on the doctor's name
        const filteredData = data.filter(
          (patient) => patient.doctor === doctorName
        );

        // If a date is selected, further filter appointments based on that date
        const filteredByDate = selectedDate
          ? filteredData.filter((appointment) =>
              appointment.appointment_date.startsWith(selectedDate)
            )
          : filteredData;

        setDetails(filteredByDate);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchPatientDetails();
  }, [doctorName, selectedDate]); // Update the effect when doctorName or selectedDate changes

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleCheck = async (id) => {
    const updatedDetails = details.map((patient) => {
      if (patient._id === id) {
        return { ...patient, checked: true };
      }
      return patient;
    });
    setDetails(updatedDetails);
    try {
      const response = await fetch(
        `http://localhost:3168/updateAppointment/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ checked: true }), // Only send the updated checked status
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update checked status");
      }
      console.log("Checked status updated successfully");
    } catch (error) {
      console.error("Error updating checked status:", error);
    }
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
          <Form>
            <Form.Group controlId="datePicker">
              <Form.Label>Select Date:</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control"
              />
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
            <Table striped bordered hover variant="danger" className="table">
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
                    <td>
                      {!patient.checked ? (
                        <Form.Check
                          type="checkbox"
                          checked={patient.checked}
                          onChange={() => handleCheck(patient._id)}
                        />
                      ) : (
                        "Checked"
                      )}
                    </td>
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

export default DoctorPatientList;
