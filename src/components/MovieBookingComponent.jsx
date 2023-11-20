import Accordion from "react-bootstrap/Accordion";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TicketWithPriceComponent from "./TicketWithPriceComponent";
import ScreeningListComponent from "./ScreeningListComponent";
import MovieSeatsComponent from "./MovieSeatsComponent";
import userService from "../service/userService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { socket } from "../socket/socketio";
import { resetBooking } from "../utils/resetBooking";
import ConfirmBookingComponent from "./ConfirmBookingComponent";


function MovieBookingComponent() {
  const [activeItem, setActiveItem] = useState(0);
  const [adultTickets, setAdultTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [screening, setScreening] = useState("");
  const [screeningSelection, setScreeningSelection] = useState();
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const ref = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (!token) {
      return;
    }
    const email = userService.getUserEmail();
    setEmail(email);
  }, []);

  // SOCKET.IO -->
  useEffect(() => {
    socket.on("seat-update", async (screeningId) => {
      const result = await fetch(`/api/screening/${screeningId}`);
      const data = await result.json();

      setScreening(data);

      return () => {
        socket.off("seat-update");
      };
    });
  }, []);
  // <-- SOCKET.IO

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

    if (adultTickets > 0 || seniorTickets > 0 || childTickets > 0) {
      setActiveItem(2);
    } else {
      return;
    }
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

    // SOCKET CALL
    socket.emit("new-booking", screening._id);

    navigate("/bokningsbekraftelse", { state: { data: resp } });
  };

  function submitBooking(e) {
    e.preventDefault();
    handleClose();

    bookSeats();
  }

  return (
    <>
      <Accordion className="no-arrow-accordion" activeKey={activeItem + ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            1. Välj visning{" "}
            {screening ? (
              <div className="restart-button" onClick={() => resetBooking("screening", setScreening, setTotalTickets, setChosenSeats, setActiveItem)}>
                Ändra
              </div>
            ) : (
              ""
            )}
          </Accordion.Header>
          <Accordion.Body>
            <ScreeningListComponent
              setActiveItem={setActiveItem}
              setScreening={setScreening}
              screeningSelection={screeningSelection}
              setScreeningSelection={setScreeningSelection}
            />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            2. Biljettyp och antal{" "}
            {totalTickets > 0 ? (
              <div className="restart-button" onClick={() => resetBooking("ticketType", setScreening, setTotalTickets, setChosenSeats, setActiveItem)}>
                Ändra
              </div>
            ) : (
              ""
            )}
          </Accordion.Header>
          <Accordion.Body>
            <TicketWithPriceComponent onGetTickets={getTickets} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            3. Välj platser{" "}
            {chosenSeats.length > 0 ? (
              <button className="restart-button" onClick={() => resetBooking("seats", setScreening, setTotalTickets, setChosenSeats, setActiveItem)}>
                Ändra
              </button>
            ) : (
              ""
            )}
          </Accordion.Header>
          <Accordion.Body>
            {" "}
            <MovieSeatsComponent
              setActiveItem={setActiveItem}
              screening={screening}
              setScreening={setScreening}
              totalTickets={totalTickets}
              chosenSeats={chosenSeats}
              setChosenSeats={setChosenSeats}
            />{" "}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Bekräfta </Accordion.Header>
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
              <Button onClick={handleShow} id="booking-btn" className="btn login-btn ms-2">
                Boka
              </Button>
            </form>
            <div className="form-text">Vi kommer aldrig att dela din e-post med någon annan.</div>
            {!emailValid && <div className="text-danger">Vänligen ange en giltig email.</div>}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ConfirmBookingComponent show={show} handleClose={handleClose} totalTickets={totalTickets} screening={screening} submitBooking={submitBooking}/>
    </>
  );
}

export default MovieBookingComponent;
