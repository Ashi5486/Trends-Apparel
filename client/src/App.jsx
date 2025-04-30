import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

// Auth Pages
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

// Protected Pages
import Dashboard from "./pages/Admin/Dashboard";
import Department from "./pages/Organization/Department";
import Line from "./pages/Organization/Line";
import Sections from "./pages/Organization/Sections";
import TidNo from "./pages/Design/TidNo";
import Styles from "./pages/Design/Styles";
import Colors from "./pages/Design/Colors";
import GarmentCode from "./pages/Design/GarmentCode";
import Sizes from "./pages/Design/Sizes";
import Machines from "./pages/Maintenance/Machines";
import MachineIssue from "./pages/Maintenance/MachineIssue";
import Operations from "./pages/Production/Operation";



// Dummy authentication check (replace with real logic)
const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // TODO: Replace with real authentication logic
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes wrapped with Layout */}
        {/* <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes> */}
      <Route path="/" element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/department" element={<Department />} />
    <Route path="/line" element={<Line />} />
    <Route path="/section" element={<Sections />} />
    <Route path="/tidno" element={<TidNo />} />
    <Route path="/style" element={<Styles />} />
    <Route path="/color" element={<Colors/>} />
    <Route path="/garment-code" element={<GarmentCode />} />
    <Route path="/size" element={<Sizes />} />
    <Route path= "/machines" element= {<Machines/>} />
    <Route path= "/machineissues" element= {<MachineIssue/>} />
    <Route path="/operation" element={<Operations/>} />
    {/* Add more protected routes here */}


    
  </Route>
  </Routes>
    </BrowserRouter>
  );
};

export default App;
