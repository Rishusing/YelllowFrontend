import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";



import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btndisable, setButtonDisable] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setButtonDisable(true);

    if (email === "" || password === "") {
      return toast.error("all fileds are mandatory", {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/')
    } catch (error) {
      toast.error(error.message.slice(15), {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
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
              Login Form
            </h2>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Button onClick={loginHandler}
                  variant="danger"
                  className="d-flex justify-content-center align-items-center"
                  disabled={btndisable}
                >
                  Login
                </Button>
              </Form.Group>
              <Row style={{ marginTop: "1rem" }}>

                <Col className="d-flex justify-content-center align-items-center">
                  <Link to='/signup' >Haven't account?</Link>
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
