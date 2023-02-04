import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { nav_links } from "../helpers/navLinks";

export default function NavbarComponent() {
  const params = useLocation();
  const currentPath = params.pathname;

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

        <Navbar.Toggle
          style={{ background: "white" }}
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex gap-3"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {nav_links.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                style={{
                  color: currentPath === item.href ? "white" : "#afafaf",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: currentPath === item.href ? "bold" : "medium",
                }}
              >
                <item.icon
                  style={{
                    width: 22,
                    height: 22,
                    marginRight: 6,
                  }}
                />
                {item.title}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
