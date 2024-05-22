import React, { useState } from "react";
import "./FindADoctor.css";
import { Card } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import doctor1 from "./images/dummy.webp";
import doctor2 from "./images/dummy.webp";
import doctor3 from "./images/dummy.webp";
import doctor5 from "./images/dummy.webp";
import doctor4 from "./images/dummy.webp";

function FindDoctor() {
  const itemList = [
    { name: "Laxman Reddy", specialist: "Psychology", photo: doctor1 },
    { name: "Sri Vidya", specialist: "Cardiology", photo: doctor2 },
    { name: "Sowjanya", specialist: "Dermatology", photo: doctor3 },
    { name: "Vamshi Reddy", specialist: "ENT", photo: doctor4 },
    { name: "Nanditha Reddy", specialist: "Gynaecology", photo: doctor5 },
  ];

  const [filteredList, setFilteredList] = useState(itemList);

  const filterBySearch = (e) => {
    const query = e.target.value;
    var updatedList = [...itemList];
    updatedList = updatedList.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        item.specialist.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  return (
    <div className="center">
      <h1>Find a Doctor</h1>
      <TextField
        id="outlined-basic"
        label="Search for doctor"
        variant="outlined"
        style={{ width: "20rem", marginBottom: "10px" }}
        onChange={filterBySearch}
      />

      <div className="row col-sm-12">
        {filteredList.map((item, index) => (
          <div key={index} className="col">
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={item.photo}
                className="doctor-image"
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.specialist}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDoctor;
