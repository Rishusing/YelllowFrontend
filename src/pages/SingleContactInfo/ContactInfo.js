
import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

import Popup from 'reactjs-popup'
import axios from 'axios';

const ContactInfo = ({ detail, deleteContact }) => {

    const [name, setName] = useState(detail.name)
    const [email, setEmail] = useState(detail.email)
    const [phone, setPhone] = useState(detail.phone)
    const [address, setAddress] = useState(detail.address)
    const [name1, setName1] = useState(detail.name)
    const [email1, setEmail1] = useState(detail.email)
    const [phone1, setPhone1] = useState(detail.phone)
    const [address1, setAddress1] = useState(detail.address)
    const [btndisable, setButtonDisable] = useState(false);

    const [open1, setOpen1] = useState(false)
    const closeModal1 = () => setOpen1(false)

    const update = () => {
        
        setButtonDisable(true);

        axios.patch(`https://wild-yak-sari.cyclic.app/contacts/${detail._id}`, { name:name1, email:email1, phone:phone1, address:address1 })
            .then((res) => {
                setName(res.data.name);
                setEmail(res.data.email);
                setPhone(res.data.phone);
                setAddress(res.data.address);
                closeModal1();
            })
            .catch((e) => {
            console.log(e);
        })

    }

    return (
        <>
            <Row className='inner square border border-3'>
                <Col>
                    <Row>
                        <Col xs lg="2" style={{ color: "black" }}><h4>{name}</h4></Col>
                        <Col xs lg="2">{phone}</Col>
                        <Col xs lg="2">{email}</Col>
                        <Col style={{ height: "100px" }}>
                            {address}
                        </Col>
                    </Row>
                </Col>
                <Col xs lg="2" className='d-flex justify-content-center align-items-center'>
                    <Button variant="success" onClick={() => setOpen1((o) => !o)}>Edit</Button>
                </Col>  
                <Col xs lg="2" className='d-flex align-items-center'>
                    <Button variant="dark" onClick ={ () =>deleteContact(detail._id)} >Delete</Button>
                </Col>
            </Row>

            <Popup
                open={open1}
                closeOnDocumentClick
                onClose={closeModal1}

            >
                <Container
                    className="  justify-content-center align-items-center popup"
                >
                    <Row>
                        <Col></Col>
                        <Col xs={1}>
                            <button
                                type="button"
                                className=" btn-close btn btn-outline-danger"
                                aria-label="Close"
                                onClick={closeModal1}
                            ></button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <h2
                                className="d-flex justify-content-center "
                                style={{ color: "red" }}
                            >
                                Contact Form
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col xs={8}>
                            <Form>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name" value={name1} onChange={(e) => setName1(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Email" value={email1} onChange={(e) => setEmail1(e.target.value)}  />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" placeholder="Mobile Number" value={phone1} onChange={(e) => setPhone1(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" >
                                    <Form.Label> Address </Form.Label>
                                    <Form.Control type="text" placeholder="Address" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                </Form.Group>

                                <Form.Group>
                                    <Button
                                        variant="danger"
                                        className="d-flex justify-content-center align-items-center"
                                        onClick={update}
                                        disabled={btndisable}
                                    >
                                        Update
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Popup>
        </>
    )
}

export default ContactInfo