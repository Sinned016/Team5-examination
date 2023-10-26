import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import authService from "../service/authService";
import memoryService from "../service/memoryService";
import userService from "../service/userService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleValidation = (e) => {
    let formIsValid = true;

    if (password.length < 6) {
      formIsValid = false;
      setPasswordError("Password too short. Should be at least 6 characters");
      return false;
    }

    if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[a-z]/.test(password)) {
      formIsValid = false;
      setPasswordError(
        "The password must contain a capital letter, a lowercase letter, and a digit!"
      );
      return false;
    }

    if (/\s/.test(password)) {
      formIsValid = false;
      setPasswordError("Password should not contain spaces");
      return false;
    } else {
      setPasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  async function loginSubmit(e) {
    e.preventDefault();
    const formIsValid = handleValidation();
    if (formIsValid) {
      let res = await authService.authenticate({ email, password });
      let data = await res.json();
      if (res.status >= 400) {
        setInfoMessage(data.message);
      } else {
        setInfoMessage(data.message);

        memoryService.saveLocalValue("JWT_TOKEN", data.accessToken);
        const role = userService.getUserRole();
        if (role === "member") {
          console.log("member", data.accessToken);
          //setTimeout(() => navigate("/user/bookings"), 1000); // where to go when logged in ?
        }
      }
    }
  }

  return (
    <Container
      fluid
      style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={loginSubmit}>
        <Row className="justify-content-center">
          <Col>
            <h1 className="text-center mb-4">Logga in</h1>
            <div className="input-icon-container">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                type="email"
                className="form-control with-icon"
                name="emailInput"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <small className="text-danger form-text">{emailError}</small>
            </div>
            <div className="input-icon-container">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                className="form-control with-icon"
                placeholder="Lösenord"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <small className="text-danger form-text">{passwordError}</small>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Kom ihåg mig</label>
            </div>
            <small className="form-text text-center text-danger">{infoMessage}</small>
            <p className="text-center mt-3">
              Glöm ditt lösenord? <span style={{ color: "#FFD700" }}>Återställ här!</span>
            </p>
            <p className="text-center">
              Är du inte medlem men vill bli? <span style={{ color: "#FFD700" }}>Klicka här!</span>
            </p>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn cancel-btn me-2">AVBRYT</button>
              <button className="btn login-btn  ms-2" type="submit">
                LOGGA IN
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}