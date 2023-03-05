import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Popup from 'reactjs-popup'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import ContactInfo from './SingleContactInfo/ContactInfo';
import axios from 'axios';

export default function Home() {

  const [data, setData] = useState([]);
  const [userId, setId] = useState();
  const [btndisable, setButtonDisable] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setId(currentUser.uid)
      axios.get(`https://wild-yak-sari.cyclic.app/allcontacts/${currentUser.uid}`)
        .then((res) => {
          setData(res.data);
        })
        .catch(e => {
        console.log("Error");
      })
    });
  }, [])

  const navigate = useNavigate()
  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  }

  const [open1, setOpen1] = useState(false)
  const closeModal1 = () => setOpen1(false)

  const deleteContact = (id) => {
    const newData = data.filter((val) => id !== val._id);
    setData(newData);
    setButtonDisable(true);

    axios.delete(`https://wild-yak-sari.cyclic.app/contacts/${id}`);

  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const addContact = () => {
    axios.post(`https://wild-yak-sari.cyclic.app/addcontact`, {userId, name, email, phone, address })
      .then((res) => {
        
        setData([...data, res.data]);
        closeModal1();
      })
      .catch((e) => {
      console.log(e);
    })
  }

  return (
    <>
      <Container className='outer'>
        <Row >
          <Col className='d-flex justify-content-center align-items-center'><h2 style={{ color: "blueviolet" }}>My Contacts</h2></Col>
          <Col className='d-flex justify-content-center align-items-center'>
            <Button variant="danger" onClick={() => setOpen1((o) => !o)}>Add Contacts</Button>
            <Button variant="danger" className='mx-auto' onClick={logout}>Logout</Button>

          </Col>
        </Row>

        {
          data.length && data.map((con) => <ContactInfo detail={con} key={con._id} deleteContact={deleteContact } />)
        }

      </Container>

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

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" placeholder="Mobile Number" onChange={(e) => setPhone(e.target.value)}  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label> Address </Form.Label>
                  <Form.Control type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}  />
                </Form.Group>

                <Form.Group>
                  <Button
                    variant="danger"
                    className="d-flex justify-content-center align-items-center"
                    onClick={addContact}
                    disabled={btndisable}
                  >
                    Add
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </Popup>

    </>
  );
}