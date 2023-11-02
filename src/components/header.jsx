import { useState } from "react";
// import { useStates } from "react-easier"
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import memoryService from "../service/memoryService";
import userService from "../service/userService";
import dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";

export default function Header() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("JWT_TOKEN");

  async function logout() {
    memoryService.clearLocalValue("JWT_TOKEN");
    userService.removeUserRole();
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">FILMVISARNA LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/register">Bli medlem</NavDropdown.Item>
              <NavDropdown.Item href="/login">Logga in</NavDropdown.Item>
              <NavDropdown.Item href="/bookings/">Bokningar</NavDropdown.Item>
              <NavDropdown.Item href="/{$logout}">Logga ut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
