import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";

function Dashboard() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState();
  useEffect(() => {
    ajax("api/assignments", "GET", jwt).then((data) => {
      setAssignments(data);
      console.log("data: ");
      console.log(data);
    });
  }, []);

  function createAssignment() {
    ajax("api/assignments", "POST", jwt).then((assignment) => {
      console.log(assignment);
      window.location.href = `/assignments/${assignment.id}`;
    });
  }

  return (
    <div>
      <div>
        {assignments ? (
          assignments.map((assignment) => (
            <div key={assignment.id}>
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
