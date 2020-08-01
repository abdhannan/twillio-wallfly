import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

class AppLoading extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return(
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
        );
    }
}

export default AppLoading;