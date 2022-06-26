import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const assignmentsID = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState({
    branch: "",
    githubUrl: "",
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);

  useEffect(() => {
    ajax("/api/assignments/" + assignmentsID, "GET", jwt).then(
      (assignmentInfo) => {
        let assignmentData = assignmentInfo.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        setAssignments(assignmentData);
        setAssignmentEnums(assignmentInfo.assignmentEnums);
        console.log(`dataInfo: `);
        console.log(assignmentInfo);
      }
    );
  }, []);

  function save() {
    ajax(
      "/api/assignments/updateAssignment/" + assignmentsID,
      "POST",
      jwt,
      assignments
    ).then((data) => {
      console.log("data: ");
      console.log(data);
    });
  }

  function updateAssignment(props, value) {
    const newAssignment = { ...assignments };
    newAssignment[props] = value;
    setAssignments(newAssignment);
    console.log(assignments);
  }

  return (
    <div>
      <Row className="d-flex align-items-center">
        <Col className="m-3" sm="4">
          <h2 className="assignmentsID">Assignment{" " + assignmentsID}</h2>
        </Col>
        <Col sm="5">
          {assignments ? (
            <Badge pill bg="primary" className="fs-6">
              {" " + assignments.status}
            </Badge>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="m-3">
            Assignment Number
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {assignmentEnums.map((element) => 
              <Dropdown.Item href="#/action-1">
                {element.assignmentName}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Row>
        <Form.Group className="d-flex align-items-center">
          <Col sm="3">
            <Form.Label className="fs-4 m-3">Branch: </Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignments.branch}
            />
          </Col>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="d-flex align-items-center">
          <Col sm="3">
            <Form.Label className="fs-4 m-3">GithubURL: </Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              onChange={(e) => updateAssignment("githubUrl", e.target.value)}
              value={assignments.githubUrl}
            />
          </Col>
        </Form.Group>
      </Row>
      <Button className="m-3" size="lg" onClick={() => save()}>
        Submit assignment
      </Button>
    </div>
  );
};

export default AssignmentView;
