import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar expand="lg" variant="dark" className="fg-navbar mb-0">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          FreshGuard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="fg-main-nav" />
        <Navbar.Collapse id="fg-main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/inventory">
              Inventory
            </Nav.Link>
            <Nav.Link as={NavLink} to="/scan">
              Scan
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
