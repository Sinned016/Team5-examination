import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import Nav from "react-bootstrap/Navbar";

export default function AppHeader() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Ändra target i href */}
        <Navbar.Brand href="#home">Filmvisarna</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="SJ" id="basic-nav-dropdown">
              {/* Ändra target i href */}
              <NavDropdown.Item href="#register">
                Bli medlem
                <img
                  src="/public/images/profillogo.png"
                  width={25}
                  height={25}
                  alt="Profile logo"
                />
              </NavDropdown.Item>
              {/* Ändra target i href */}
              <NavDropdown.Item href="#login">Logga in</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
