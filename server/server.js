const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const URI = process.env.MONGO_URL;
const PORT = process.env.PORT || 3168;
mongoose
  .connect(URI)
  .then(() => {
    console.log("Database connected successfully....");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
  });

const userSchema = require("./model/userModel");
const doctorSchema = require("./model/doctorModel");
const adminSchema = require("./model/adminModel");
const appointmentSchema = require("./model/appointmentModel");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// User Login
app.post("/getUser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.password === password) {
      res.status(200).json({ username: user.fullname });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});

// User Registration
app.post("/addUser", async (req, res) => {
  const { password, fullname, email } = req.body;
  if (!password || !fullname || !email) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields properly!!!" });
  }
  try {
    const userExist = await userSchema.findOne({ email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "User already exists with this email!!!" });
    } else {
      const newUser = new userSchema({
        password,
        fullname,
        email,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully..." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
});

// Admin Login
app.post("/getAdmin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    if (admin.password === password) {
      res.status(200).json({ username: admin.fullname });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});
//Admin Register
app.post("/addAdmin", async (req, res) => {
  const { password, fullname, email } = req.body;
  if (!password || !fullname || !email) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields properly!!!" });
  }
  try {
    const adminExist = await adminSchema.findOne({ email });
    if (adminExist) {
      return res
        .status(422)
        .json({ error: "Admin already exists with this email!!!" });
    } else {
      const newAdmin = new adminSchema({
        password,
        fullname,
        email,
      });
      await newAdmin.save();
      res.status(201).json({ message: "Admin registered successfully..." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the Admin." });
  }
});
// Doctor Login
app.post("/getDoctor", async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await doctorSchema.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    if (doctor.password === password) {
      res.status(200).json({ username: doctor.fullname });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while logging in" });
  }
});
//getDoctor by params id

app.get("/getDoctor/:id", async (req, res) => {
  try {
    const doctor = await doctorSchema.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving doctor details" });
  }
});

//get doctor details
app.get("/doctors", async (req, res) => {
  try {
    const doctors = await doctorSchema.find();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving doctors." });
  }
});
// Doctor Registration
app.post("/addDoctor", async (req, res) => {
  const {
    fullname,
    date_of_birth,
    qualification,
    specialist,
    email,
    phone_number,
    password,
  } = req.body;
  if (
    !fullname ||
    !date_of_birth ||
    !qualification ||
    !specialist ||
    !email ||
    !phone_number ||
    !password
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields properly!!!" });
  }
  try {
    const doctorExist = await doctorSchema.findOne({ email });
    if (doctorExist) {
      return res
        .status(422)
        .json({ error: "Doctor already exists with this email!!!" });
    } else {
      const newDoctor = new doctorSchema({
        fullname,
        date_of_birth,
        qualification,
        specialist,
        email,
        phone_number,
        password,
      });
      await newDoctor.save();
      res.status(201).json({ message: "Doctor registered successfully..." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the Doctor." });
  }
});
//Update Doctor
app.put("/updateDoctor/:id", async (req, res) => {
  const {
    fullname,
    date_of_birth,
    qualification,
    specialist,
    email,
    phone_number,
    password,
  } = req.body;

  try {
    // Find the doctor by ID and update the fields
    const updatedDoctor = await doctorSchema.findByIdAndUpdate(
      req.params.id,
      {
        fullname,
        date_of_birth,
        qualification,
        specialist,
        email,
        phone_number,
        password,
      },
      { new: true } // Set to true to return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Return the updated doctor
    return res.json(updatedDoctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//Doctor Delete
app.delete("/deleteDoctor/:id", async (req, res) => {
  try {
    await doctorSchema.findByIdAndDelete(req.params.id);
    return res.json({ message: "Doctor Deleted Successfully..." });
  } catch (error) {
    console.log(error.message);
  }
});
// Create Appointment
app.post("/addAppointment", async (req, res) => {
  const {
    patientname,
    age,
    gender,
    specialist,
    doctor,
    appointment_date,
    appointment_time,
    checked,
  } = req.body;
  if (
    !patientname ||
    !age ||
    !gender ||
    !specialist ||
    !doctor ||
    !appointment_date ||
    !appointment_time ||
    !checked
  ) {
    return res
      .status(422)
      .json({ error: "Please fill all the required fields properly!!!" });
  }
  try {
    const newAppointment = new appointmentSchema({
      patientname,
      age,
      gender,
      specialist,
      doctor,
      appointment_date,
      appointment_time,
      checked,
    });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment Created Successfully..." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the appointment." });
  }
});
//get specialist
app.get("/specialists", async (req, res) => {
  try {
    const specialists = await doctorSchema.distinct("specialist");
    res.status(200).json(specialists);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving specialists." });
  }
});
// Retrieve Appointments
app.get("/getAppointments", async (req, res) => {
  try {
    const appointments = await appointmentSchema.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving appointments." });
  }
});

// Update Appointment
app.put("/updateAppointment/:id", async (req, res) => {
  const {
    patientname,
    age,
    gender,
    specialist,
    doctor,
    appointment_date,
    appointment_time,
    checked,
  } = req.body;

  try {
    // Find the appointment by ID and update the fields
    const updatedAppointment = await appointmentSchema.findByIdAndUpdate(
      req.params.id,
      {
        patientname,
        age,
        gender,
        specialist,
        doctor,
        appointment_date,
        appointment_time,
        checked,
      },
      { new: true } // Set to true to return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Return the updated appointment
    return res.json(updatedAppointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server error" });
  }
});

// Start server
app.listen(PORT, (error) => {
  if (error) {
    console.log("Failed to connect server");
  } else {
    console.log(`Server started and running on port ${PORT}`);
  }
});
