import React from "react";
import { useEffect } from "react";
import { Routes,Route } from "react-router-dom";
import AssignmentView from "./Assignment";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage"
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";
import "./App.css";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  useEffect(() => {
    if(!jwt){
      const obj = {
        username: "alaeddin",
        password: "asdfasdf",
      };
      fetch("api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(obj),
      })
        .then((resp) => Promise.all([resp.json(), resp.headers]))
        .then(([body, headers]) => {
          setJwt(headers.get("authorization"));
        });
    }
  },[]);

  useEffect(() => {
    console.log(" JWT " + jwt);
  }, [jwt]);

  return (

      
     <Routes>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Dashboard" 
      element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      }/>
      <Route path="/Homepage" element={<Homepage/>}/>
      <Route path="/assignments/:id" element={
      <PrivateRoute>
      <AssignmentView/>
      </PrivateRoute>
      }
      />
     </Routes>

  );
}

export default App;
