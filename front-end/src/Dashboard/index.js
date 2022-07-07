import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import { Badge, Button, Card, gridTemplateColumns, Row } from "react-bootstrap";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState();
  useEffect(() => {
    ajax("api/assignments/assignmentsList", "GET", jwt).then((data) => {
      setAssignments(data);
    });
  }, []);

  function createAssignment() {
    ajax("api/assignments", "POST", jwt).then((assignment) => {
      window.location.href = `/assignments/${assignment.id}`;
    });
    /**<Link to={`/assignments/${assignment.id}`}>
                Assignment ID: {assignment.id}
              </Link>
            </div> */
  }
  function parseJwt(jwt){
    try {
      return JSON.parse(atob(jwt.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  return (
    <div>
      {console.log(parseJwt(jwt))}
      <div className="d-flex justify-content-end" 
      style={{cursor:"pointer"}}
      onClick={()=>{
        setJwt(null);
        window.location.href=`/login`;
      }
        }>
          Logout
        </div>
      <Button
        variant="success"
        size="lg"
        className="m-3"
        onClick={() => createAssignment()}
      >
        Submit assignment
      </Button>
      <div className="d-flex flex-wrap bd-highlight example-parent">
        {assignments ? (
          assignments.map((assignment) => (
            <div className="p-2 bd-highlight col-example">
              <Card style={{ width: "22rem" }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Assignment #{assignment.id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <Badge>{assignment.status}</Badge>
                  </Card.Subtitle>
                  <Card.Text>
                    <p>
                      {" "}
                      <b>Github URL:</b>
                      {assignment.githubUrl}
                    </p>
                    <p>
                      {" "}
                      <b>Branch:</b>
                      {assignment.branch}
                    </p>
                  </Card.Text>
                  <Button
                    onClick={() => {
                      window.location.href = `/assignments/${assignment.id}`;
                    }}
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
