import React, { useState,jwt_decode } from "react";
import { Routes, Route } from "react-router-dom";
import AssignmentView from "./Assignment";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import { useLocalState } from "./util/useLocalStorage";
function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(parseJwt);
  
  function parseJwt(jwt){
    if(jwt){
      setRoles(jwt_decode(jwt).authorities[0]);
      console.log("jwt_decode: ");
      console.log(jwt_decode(jwt));
    }return[];
  }

  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route
        path="/Dashboard"
        element={
          roles.find((role)=>role ==="ROLE_STUDENT") ? (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          )
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
