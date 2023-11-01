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

  
    <DropdownButton id="dropdown-basic-button" title={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>} >
    
    
      <Dropdown.Item href="/register">Bli medlem</Dropdown.Item>
      <Dropdown.Item href="/login">Logga in</Dropdown.Item>
      <Dropdown.Item href="/bookings/">Mina bokningar</Dropdown.Item>
      <Dropdown.Item href="/" onClick={logout}>Logga ut</Dropdown.Item>
    </DropdownButton>



</Container>




  );
}
