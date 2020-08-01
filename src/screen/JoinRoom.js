import React, { Component } from "react";
import { Container, Row, Col, Table, Button, Modal, Form, Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";

class JoinRoom extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            username: "",
            roomName: "",  
            joinRoom: false
        };
    }

    onChangeText = (text, type) => {
        if(type === "username")
        {
            this.setState({ username: text.target.value });
        }
        else
        {
            this.setState({ roomName: text.target.value });
        }
    }


    render() {
        const openModal = () => {
            this.setState({ show: true });
        }

        const closeModal = () => {
            this.setState({ show: false });
        }

        const submit = () => {
            this.setState({ show: false, joinRoom: true });
        }

        if (this.state.joinRoom === true) {
            var url = "/rooms?username=" + this.state.username + "&room_name=" + this.state.roomName;
            return <Redirect to={url} />
        }

        return(
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Twilio Video</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/rooms/create">Start New Room</Nav.Link>
                            <Nav.Link href="/rooms/join">Join Room</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Container fluid className="App-ContainerFlex">

                    <Row className="row-custom center">
                        <Col>
                            <Button className="App-ButtonCenter" variant="primary" onClick={openModal}>Join Room</Button>
                        </Col>
                    </Row>
                    
                    <Modal show={this.state.show} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Join Room</Modal.Title>
                        </Modal.Header>
                        
                        <Form>
                            <Modal.Body>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your Name" onChange={(text) => this.onChangeText(text, 'username')} required/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Room Name</Form.Label>
                                    <Form.Control type="email" placeholder="Room Name" onChange={(text) => this.onChangeText(text, 'roomName')}/>
                                </Form.Group>
                            </Modal.Body>
                        </Form>

                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={submit}>
                                Start
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
        );
    }
}

export default JoinRoom;