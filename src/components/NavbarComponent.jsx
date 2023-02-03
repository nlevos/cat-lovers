import React from "react";
import { Container, Navbar } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <Navbar
      className="navbar"
      expand="lg"
      style={{ position: "sticky", height: "fit-content", top: 0, zIndex: 2 }}
    >
      <Container>
        <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="#">
          Cat Lovers App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
