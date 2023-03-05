import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btndisable, setButtonDisable] = useState(false);


  const navigate = useNavigate();

  const registerHandler = () => {
    if (password !== confirmPassword) {
      return toast.error("Password not matched", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    try {
      setButtonDisable(true);
      createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate('/')

    } catch (error) {
      setButtonDisable(false);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  };

  return (
    <>
      <ToastContainer />
      <Container className="outer">
        <Row>
          <Col>
            <h2
              className="d-flex justify-content-center align-items-center"
              style={{ color: "red" }}
            >
              Signup Form
            </h2>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Button
                  variant="danger"
                  className="d-flex justify-content-center align-items-center"
                  onClick={registerHandler}
                  disabled={btndisable}
                >
                  Signup
                </Button>
              </Form.Group>
              <Row style={{ marginTop: "1rem" }}>

                <Col className="d-flex justify-content-center align-items-center">
                  <Link to='/login'>Already account? </Link>
                </Col>
                <Col>

                </Col>
              </Row>
            </Form>

          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}
