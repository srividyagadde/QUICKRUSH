import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminNavbar from "./components/Layouts/AdminNavbar";
import PatientNavbar from "./components/Layouts/UserNavbar";
import DoctorNavbar from "./components/Layouts/DoctorNavbar";
import Home from "./components/Layouts/Home";
import AdminLogin from "./components/Pages/AdminLogin";
import DefaultNavbar from "./components/Layouts/MyNavbar";
import DoctorLogin from "./components/Pages/DoctorLogin";
import UserLogin from "./components/Pages/UserLogin";
import UserRegister from "./components/Pages/UserRegister";
import AppointmentForm from "./components/User/AppointmentForm";
import FindDoctor from "./components/User/FindADoctor";
import Services from "./components/User/Services";
import DoctorPatientList from "./components/Doctor/DoctorPatientList";
import DoctorDashboard from "./components/Doctor/Dashboard";
import DoctorRegister from "./components/Admin/DoctorRegister";
import AdminViewDoctors from "./components/Admin/ViewDoctors";
import EditDoctor from "./components/Admin/EditDoctorDetails";
import ViewPatientList from "./components/Admin/ViewPatient";
import Dashboard from "./components/Admin/Dashboard";

const App = () => {
  const [role, setRole] = useState(() => localStorage.getItem("role"));

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  const handleLogout = () => {
    window.location.reload(true);
    setRole("null");
    localStorage.removeItem("role");
  };

  const handleAdminLogin = () => {
    setRole("admin");
  };

  const handleDoctorLogin = () => {
    setRole("doctor");
  };

  const handleUserLogin = () => {
    setRole("patient");
  };

  return (
    <div>
      <BrowserRouter>
        <div>
          {role === "null" && <DefaultNavbar setRole={setRole} />}
          {role === "admin" && (
            <AdminNavbar setRole={setRole} onLogout={handleLogout} />
          )}
          {role === "doctor" && (
            <DoctorNavbar setRole={setRole} onLogout={handleLogout} />
          )}
          {role === "patient" && (
            <PatientNavbar setRole={setRole} onLogout={handleLogout} />
          )}
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Admin"
            element={<AdminLogin setRole={handleAdminLogin} />}
          />
          <Route
            path="/Doctor"
            element={<DoctorLogin setRole={handleDoctorLogin} />}
          />
          <Route
            path="/User"
            element={<UserLogin setRole={handleUserLogin} />}
          />
          <Route
            path="/UserRegister"
            element={<UserRegister setRole={handleUserLogin} />}
          />
          <Route path="/User/FindDoctor" element={<FindDoctor />} />
          <Route path="/User/Services" element={<Services />} />
          <Route path="/User/AppointmentForm" element={<AppointmentForm />} />
          <Route path="/Doctor/PatientsList" element={<DoctorPatientList />} />
          <Route path="/Doctor/Dashboard" element={<DoctorDashboard />} />
          <Route path="/Admin/AddDoctor" element={<DoctorRegister />} />
          <Route path="/Admin/ViewDoctors" element={<AdminViewDoctors />} />
          <Route path="/Admin/edit-doctor/:id" element={<EditDoctor />} />
          <Route path="/Admin/ViewPatients" element={<ViewPatientList />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
