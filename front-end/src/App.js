import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AssignmentView from "./Assignment";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route
        path="/Dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/Homepage" element={<Homepage />} />
      <Route
        path="/assignments/:id"
        element={
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
