import React from "react";
import "./FindADoctor.css";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function FindDoctor() {
  const itemList = [
    { name: "Laxman Reddy", specialist: "Psychology" },
    { name: "Sri Vidya", specialist: "Cardiology" },
    { name: "Sowjanya", specialist: "Dermatology" },
    { name: "Vamshi Reddy", specialist: "ENT" },
    { name: "Nanditha Reddy", specialist: "Gynaecology" },
  ];

  const [filteredList, setFilteredList] = useState(itemList);

  const filterBySearch = (e) => {
    const query = e.target.value;
    var updatedList = [...itemList];
    updatedList = updatedList.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
        item.specialist.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setFilteredList(updatedList);
  };

  return (
    <div className="searchbar">
      <h1>Find a Doctor</h1>
      <input
        type="text"
        placeholder="Search for doctor"
        onChange={filterBySearch}
        className="searchbarStyle"
      />
      <div className="row col-sm-12 g-4  center">
        {filteredList.map((item, index) => (
          <Card
            style={{ width: "18rem", margin: "6px" }}
            bg="light"
            text="dark"
            border="primary"
          >
            {" "}
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 ">{item.specialist}</Card.Subtitle>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default FindDoctor;
