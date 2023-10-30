import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import TicketWithPriceComponent from "./TicketWithPriceComponent";
import ScreeningListComponent from "./ScreeningListComponent";
import MovieSeatsComponent from "./MovieSeatsComponent";
import userService from "../service/userService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MovieBookingComponent() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [screening, setScreening] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!isValidEmail(email)) {
      setEmailValid(false);
      return; // exit the function if email is invalid, which means you need to have a valid email to book tickets
    } else setShow(true);
  };

  function getTickets(adultTickets, seniorTickets, childTickets) {
    setAdultTickets(adultTickets);
    setSeniorTickets(seniorTickets);
    setChildTickets(childTickets);
    setTotalTickets(adultTickets + seniorTickets + childTickets);
  }

  function isValidEmail(email) {
    return email.includes("@");
  }

  const bookSeats = async () => {
    const body = {
      email: email,
      adult: adultTickets,
      child: childTickets,
      senior: seniorTickets,
      bookedSeats: chosenSeats,
      movieTitle: screening.movieDetails[0].title,
      date: screening.date,
      time: screening.time,
      theater: screening.theater,
    };

    let resp = await userService.bookSeats(screening._id, body);
    console.log(resp);
  };

  function submitBooking(e) {
    e.preventDefault();
    handleClose();

    console.log("connecting with backend");
    // Here can make put request to book tickets
    bookSeats();
  }
  return (
    <div className="container">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Välj visning</Accordion.Header>
          <Accordion.Body>
            <ScreeningListComponent setScreening={setScreening} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>2. Biljettyp och antal</Accordion.Header>
          <Accordion.Body>
            <TicketWithPriceComponent onGetTickets={getTickets} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>3. Välj platser</Accordion.Header>
          <Accordion.Body>
            {" "}
            <MovieSeatsComponent
              screening={screening}
              totalTickets={totalTickets}
              setChosenSeats={setChosenSeats}
            />{" "}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Bekräfta</Accordion.Header>
          <Accordion.Body>
            <form>
              <input
                type="email"
                placeholder="mail@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValid(isValidEmail(e.target.value));
                }}
                className="form-control"
              ></input>
              <Button onClick={handleShow} className="btn login-btn ms-2">
                Boka
              </Button>
            </form>
            <div className="form-text">Vi kommer aldrig att dela din e-post med någon annan.</div>
            {!emailValid && <div className="text-danger">Vänligen ange en giltig email.</div>}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Modal show={show} onHide={handleClose} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Bokningsbekräftelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>Är du säker på att boka filmen {screening.movieDetails[0].title}? </Modal.Body>
        <Modal.Footer>
          <Button className="btn cancel-btn me-2" onClick={handleClose}>
            Avbryt
          </Button>
          <Button className="btn login-btn" onClick={submitBooking}>
            Boka
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MovieBookingComponent;
