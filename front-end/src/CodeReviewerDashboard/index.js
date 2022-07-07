import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";

const CodeReviewerDashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState();

  useEffect(() => {
    ajax("api/assignments/assignmentsList", "GET", jwt).then((data) => {
      setAssignments(data);
      console.log(data);
    });
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
      <Row>
        <Col>
          <h1>I'm the reviewer</h1>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-flex flex-wrap bd-highlight example-parent">
            {assignments ? (
              assignments.map((assignment) => (
                <div className="p-2 bd-highlight col-example">
                  {assignment.status === "Submitted" ? (
                    <Card style={{ width: "22rem" }}>
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>Assignment #{assignment.id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          <Badge>{assignment.status}</Badge>
                        </Card.Subtitle>
                        <Card.Text>
                          <p>
                            {" "}
                            <b>Code Review Video URL:</b>
                            {assignment.codeReviewVideoUrl}
                          </p>
                          <p>
                            <b>Github URL:</b>
                            {assignment.githubUrl}
                          </p>
                          <p>
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
                  ) : (
                    <></>
                  )}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CodeReviewerDashboard;
