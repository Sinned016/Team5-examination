import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import authService from "../service/authService";
import userService from "../service/userService";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../App";

export default function LoginPage() {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const userEmail = location.state?.userEmail;
    console.log(userEmail);
    if (userEmail) {
      setEmail(userEmail);
    }
  }, [location.state]);

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

        logIn(data.accessToken);
        const role = userService.getUserRole();
        if (role === "member") {
          console.log("member", data.accessToken);
          navigate("/bookings");
        }
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
                placeholder="E-mail"
                value={email}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <small className="text-danger form-text">{passwordError}</small>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" />
              <label className="form-check-label">Kom ihåg mig</label>
            </div>
            <small className="form-text text-center text-danger">{infoMessage}</small>

            <p className="text-center mt-3" onClick={() => alert("Fungerar inte för tillfället!")}>
              Glöm ditt lösenord? <span style={{ color: "#FFD700" }}>Återställ här!</span>
            </p>
            <p className="text-center">
              Är du inte medlem men vill bli?
              <Link to="/register">
                <span style={{ color: "#FFD700" }}> Klicka här!</span>
              </Link>
            </p>
            <div className="d-flex justify-content-center mt-4">
              <button id="cancel-btn" className="btn cancel-btn me-2" onClick={() => navigate("/")}>
                AVBRYT
              </button>
              <button id="login-btn" className="btn login-btn  ms-2" type="submit">
                LOGGA IN
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}
