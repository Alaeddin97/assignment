import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

function Dashboard() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState();
  useEffect(() => {
    fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((data) => {
        console.log(data);
        setAssignments(data);
      });
  }, []);

  function createAssignment() {
    fetch("api/assignments", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((assignment) => {
        console.log(assignment);
        window.location.href = `/assignments/${assignment.id}`;
      });
  }
  return (
    <div>
      <div>
        {assignments ? (
          assignments.map((assignment) => (
            <div>
              <Link to={`/assignments/${assignment.id}`}>
                Assignment ID: {assignment.id}
              </Link>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <button onClick={() => createAssignment()}>Submit assignment</button>
    </div>
  );
}

export default Dashboard;
