import React, { useState, useEffect } from "react";
import "./FindADoctor.css";

function FindDoctor() {
  const [doctorList, setDoctorList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3168/doctors")
      .then((response) => response.json())
      .then((data) => {
        setDoctorList(data);
        setFilteredList(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the doctor data!", error);
      });
  }, []);

  const filterBySearch = (e) => {
    const query = e.target.value;
    const updatedList = doctorList.filter((item) => {
      return (
        item.fullname.toLowerCase().includes(query.toLowerCase()) ||
        item.specialist.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredList(updatedList);
  };

  return (
    <div
      className="center"
      style={{
        marginTop: "60px",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h1>Find a Doctor</h1>
      <input
        type="text"
        placeholder="Search for doctor"
        className="mb-4 p-2 border border-gray-300 rounded"
        style={{ width: "20rem" }}
        onChange={filterBySearch}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredList.map((doctor, index) => (
          <div key={index} className="col">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={doctor.photo || "default_photo_url_here"}
                alt="Doctor"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{doctor.fullname}</div>
                <p className="text-gray-700 text-base">{doctor.specialist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDoctor;
