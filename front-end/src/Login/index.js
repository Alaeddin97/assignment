import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useLocalState } from "../util/useLocalStorage";

function Login(props) {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [utilisateur, setUtilisateur] = useState();
  const [motdepasse, setMotdepasse] = useState();

  function seConnecter() {
    // if (!jwt) {
    const obj = {
      username: utilisateur,
      password: motdepasse,
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
        window.location.href = `/Dashboard`;
      });
    //}
  
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md="8" lg="6">
            <Form.Group>
              <Form.Label className="fs-3">Username</Form.Label>
              <Form.Control
                onChange={(e) => setUtilisateur(e.target.value)}
                value={utilisateur}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md="8" lg="6">
            <Form.Group>
              <Form.Label className="fs-3">Password</Form.Label>
              <Form.Control
                onChange={(e) => setMotdepasse(e.target.value)}
                value={motdepasse}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
          >
            <Button size="lg" onClick={() => seConnecter()}>
              Submit
            </Button>
            <Button size="lg">Exit</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
