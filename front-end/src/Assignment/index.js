import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import ajax from "../Services/fetchService";
import { useLocalState } from "../util/useLocalStorage";

const AssignmentView = () => {
  const assignmentsID = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status:[],
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatues, setAssignmentStatues] = useState(null);
  function save() {
    if (assignment.status === assignmentStatues[0].status) {
      assignment.status=assignmentStatues[1].status;
     // updateAssignment("status", assignmentStatues[1].status);
      console.log("status: ");
      console.log(assignment.status);
    } else {
      console.log("FALSE");
      console.log("status: ");
    }
    ajax(
      "/api/assignments/updateAssignment/" + assignmentsID,
      "POST",
      jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  }

  useEffect(() => {
    ajax("/api/assignments/" + assignmentsID, "GET", jwt).then(
      (assignmentInfo) => {
        let assignmentData = assignmentInfo.assignment;
        if (assignmentData.branch === null) assignmentData.branch = ""; //Avoid warning about null value of branch first GET
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = ""; //Avoid warning about null value of githubUrl first GET
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentInfo.assignmentEnums);
        setAssignmentStatues(assignmentInfo.assignmentStatusEnums);
        console.log(assignmentInfo);
      }
    );
  }, []);

  function updateAssignment(props, value) {
    const newAssignment = { ...assignment };
    newAssignment[props] = value;
    setAssignment(newAssignment);
  }

  return (
    <div>
      <Row className="d-flex align-items-center">
        <Col className="m-3" sm="4">
          <h2 className="assignmentsID">
            {assignment.number ? `Assignment ${assignment.number}` : <></>}
          </h2>
        </Col>
        <Col sm="5">
          {assignment ? (
            <Badge pill bg="primary" className="fs-6">
              {" " + assignment.status}
            </Badge>
          ) : (
            <></>
          )}
        </Col>
      </Row>

      <Col className="m-3">
        <DropdownButton
          as={ButtonGroup}
          variant={"info"}
          title={
            assignment.number
              ? `Assignment ${assignment.number}`
              : "Select an Assignment"
          }
          onSelect={(selectedElement) => {
            console.log("number before: ");
            console.log(assignment.number);
            updateAssignment("number", selectedElement);
            console.log("number after: ");
            console.log(assignment.number);
          }}
        >
          {assignmentEnums.map((assignmentEnum) => (
            <Dropdown.Item
              key={assignmentEnum.assignmentNum}
              eventKey={assignmentEnum.assignmentNum}
            >
              {assignmentEnum.assignmentNum}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Col>

      <Row>
        <Form.Group className="d-flex align-items-center">
          <Col sm="3">
            <Form.Label className="fs-4 m-3">Branch: </Form.Label>
          </Col>
          <Col sm="8">
            <Form.Control
              onChange={(e) => updateAssignment("branch", e.target.value)}
              value={assignment.branch}
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
              value={assignment.githubUrl}
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
