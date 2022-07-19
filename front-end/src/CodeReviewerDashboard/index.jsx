import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import "../App.css"
const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState();

  function claimAssignment(assignment) {
    const decodedJwt = jwt_decode(jwt);
    const user = {
      username: decodedJwt.sub,
      authorities: jwt_decode(jwt).authorities,
    };
    assignment.reviewer = user;
    assignment.status = "in review";
    ajax(
      "api/assignments/updateAssignment/" + assignment.id,
      "POST",
      jwt,
      assignment
    ).then((data) => {
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i]=data;
      setAssignments(assignmentsCopy);    
    });
  }
  useEffect(() => {
    ajax("api/assignments/assignmentsList", "GET", jwt).then((assignment) => {
      setAssignments(assignment);
      console.log(assignment);
    });
  }, []);

  useEffect(() => {
    console.log("jwt_decode: ");
    console.log(jwt_decode(jwt));
  }, []);

  return (
    <div>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = `/login`;
            }}
          >
            Logout
          </div>
        </Col>
        </Row>

      <div className="assignment-wrapper submitted">
        <div className="assignment-wrapper-title">
          Submitted
        </div>
        
          <div className="d-flex flex-wrap">
            {assignments ? (
              assignments.map((assignment) => (
                <div key={assignment.id} className=" p-2 bd-highlight col-example">
                  {assignment.status === "Submitted" ? (
                    <Card style={{ width: "22rem", height:"18rem"}}>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>Assignment #{assignment.id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          <Badge pill bg="info">{assignment.status}</Badge>
                        </Card.Subtitle>
                        <Card.Text>
                          <p>
                            <b>Code Review Video URL:</b>{assignment.codeReviewVideoUrl}
                          </p>
                          <p>
                            <b>Github URL:</b>{assignment.githubUrl}
                          </p>
                          <p>
                            <b>Branch:</b>{assignment.branch}
                          </p>
                        </Card.Text>
                        <Button onClick={() => claimAssignment(assignment)}>
                          Claim
                        </Button>
                      </Card.Body>
                    </Card>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

      </div>
      <div className="assignment-wrapper submitted">
        <div className="assignment-wrapper-title">
          In review
        </div>
        
          <div className="d-flex flex-wrap">
            {assignments ? (
              assignments.map((assignment) => (
                <div key={assignment.id} className="p-2 bd-highlight col-example">
                  {assignment.status === "in review" ? (
                    <Card style={{ width: "22rem", height:"18rem"}}>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>Assignment #{assignment.id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          <Badge pill bg="info">{assignment.status}</Badge>
                        </Card.Subtitle>
                        <Card.Text>
                          <p>
                            <b>Code Review Video URL:</b>{assignment.codeReviewVideoUrl}
                          </p>
                          <p>
                            <b>Github URL:</b>{assignment.githubUrl}
                          </p>
                          <p>
                            <b>Branch:</b>{assignment.branch}
                          </p>
                        </Card.Text>
                        <Button onClick={() => claimAssignment(assignment)}>
                          Claim
                        </Button>
                      </Card.Body>
                    </Card>
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>

      </div>
    </div>
  );
};

export default CodeReviewerDashboard;
