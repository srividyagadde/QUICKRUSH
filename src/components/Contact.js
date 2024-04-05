import React from "react";
import "./Contact.css";
import "bootstrap/dist/css/bootstrap.min.css";
function Contact() {
  return (
    <div>
      <h3>Contact Us</h3>
      <div style={{ width: "80%", textAlign: "center", marginLeft: "25%" }}>
        <div className="col-md-1 inputStyles">
          <label>Your email</label>
          <input type="email"></input>
        </div>
        <div className="col-md-1 inputStyles">
          <label>Your Subject</label>

          <input type="text"></input>
        </div>
        <div className="col-md-1 inputStyles">
          <label>Your Message</label>
          <textarea></textarea>
        </div>
      </div>
    </div>
  );
}
export default Contact;
