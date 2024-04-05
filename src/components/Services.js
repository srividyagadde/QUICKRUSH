import React from "react";
import "./FindADoctor.css";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function Services() {
  const itemList = [
    {
      name: "Cancer Care",
      intro:
        " World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Labor & Deliver",
      intro:
        " World-class care for everyones. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Mental Healt",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Burn Treatment",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic",
    },
    {
      name: "Neurology",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
  ];

  return (
    <div className="searchbar">
      <div className="row col-sm-12 g-4  center">
        {itemList.map((item, index) => (
          <Card
            style={{ width: "18rem", margin: "6px" }}
            bg="light"
            text="dark"
            border="primary"
          >
            {" "}
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text style={{ fontSize: "15px" }}>{item.intro}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Services;
