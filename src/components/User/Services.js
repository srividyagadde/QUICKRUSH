import React from "react";
import "./Service.css";
import Card from "react-bootstrap/Card";

function Services() {
  const itemList = [
    {
      name: "Cancer Care",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Labor & Delivery",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Mental Health",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Burn Treatment",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
    {
      name: "Neurology",
      intro:
        "World-class care for everyone. Our health System offers unmatched, expert health care. From the lab to the clinic.",
    },
  ];

  return (
    <div
      className="searchbar"
      style={{
        marginTop: "60px",
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
        {itemList.map((item, index) => (
          <div key={index} className="col">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text style={{ fontSize: "15px" }}>{item.intro}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
