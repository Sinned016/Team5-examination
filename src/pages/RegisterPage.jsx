import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import authService from "../service/authService";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  const handleValidation = (e) => {
    let formIsValid = true;

    if (password.length < 6) {
      formIsValid = false;
      setPasswordError("Lösenordet måste innehålla minst 6 tecken!");
      return false;
    }

    if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[a-z]/.test(password)) {
      formIsValid = false;
      setPasswordError("Stor bokstav, liten bokstav och siffra krävs för lösenord!");
      return false;
    }

    if (/\s/.test(password)) {
      formIsValid = false;
      setPasswordError("Lösenordet får inte innehålla mellanrum!");
      return false;
    } else {
      setPasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  async function registerSubmit(e) {
    e.preventDefault();
    const formIsValid = handleValidation();
    if (formIsValid) {
      let res = await authService.register({ email, password });
      let data = await res.json();
      if (res.status >= 400) {
        setInfoMessage(data.message);
      } else {
        setInfoMessage(data.message);
      }
    }
  }

  return (
    <Container
      fluid
      style={{
        margin: "10em auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={registerSubmit}>
        <Row className="justify-content-center">
          <Col className="justify-content-center">
            <h1 className="text-center mb-4">Bli Medlemme</h1>
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
            <div className="input-icon-container mt-3">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <input
                type="password"
                className="form-control with-icon"
                placeholder="Lösenord"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <small className="text-danger form-text">{passwordError}</small>
            <small className="form-text text-center text-danger">{infoMessage}</small>
            <p className="text-center mt-3">
              Är du redan medlem?
              <Link to="/login">
                <span style={{ color: "#FFD700" }}> Logga in är!</span>
              </Link>
            </p>
            <div className="d-flex justify-content-center mt-4">
              <button className="btn cancel-btn me-2">AVBRYT</button>
              <button className="btn register-btn  ms-2" type="submit">
                BLI MEDLEM
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}