import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
export default function Contact() {
  return (
    <Container className='outer'>
      <Row>
        <Col><h2 className='d-flex justify-content-center align-items-center' style={{ color: "red" }}>Contact Form</h2></Col>

      </Row>
      <Row>
        <Col></Col>
        <Col>

          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name of recipient" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" style={{ height: "150px" }} placeholder="Address" />
            </Form.Group>
            <Form.Group>
              <Button variant="danger" className='d-flex justify-content-center align-items-center' href="#">Add Contacts</Button>{' '}
            </Form.Group>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>

  );

}