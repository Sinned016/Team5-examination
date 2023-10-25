import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation();
  };

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
              <small className="text-danger form-text">{passwordError}</small>
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Kom ihåg mig</label>
            </div>
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
