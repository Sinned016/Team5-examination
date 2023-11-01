import { useState } from "react";
// import { useStates } from "react-easier"
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import memoryService from "../service/memoryService";
import userService from "../service/userService";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Header() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("JWT_TOKEN");

  async function logout() {
    memoryService.clearLocalValue("JWT_TOKEN");
    userService.removeUserRole();
  }

  return (
    <Navbar expand="lg" className="navbar-body">
      <Container>
        <div className="logo-container">
          <a href="/">
            <img
              className="company-logo"
              src="/public/images/filmvisarna_logotyp.png"
              alt="Company Logo"
            />
          </a>
        </div>
      
      </Container>
    </Navbar>
  );
}
