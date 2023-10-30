import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import TicketWithPriceComponent from "./TicketWithPriceComponent";
import ScreeningListComponent from "./ScreeningListComponent";
import MovieSeatsComponent from "./MovieSeatsComponent";

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
  console.log(chosenSeats);

  function getTickets(adultTickets, seniorTickets, childTickets) {
    setAdultTickets(adultTickets);
    setSeniorTickets(seniorTickets);
    setChildTickets(childTickets);
    setTotalTickets(adultTickets + seniorTickets + childTickets);
    console.log("adult:", adultTickets, "senior:", seniorTickets, "child:", childTickets);
  
    if (adultTickets > 0 || seniorTickets > 0 || childTickets > 0) {
      setActiveItem(2);
    } else {
      return;
    }
  }

  function isValidEmail(email) {
    return email.includes("@");
  }

  function submitBooking(e) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setEmailValid(false);
      return; // exit the function if email is invalid, which means you need to have a valid email to book tickets
    }
    console.log(email, adultTickets, seniorTickets, childTickets);
    console.log("connecting with backend");
    // Here can make put request to book tickets
  }

  return (
    <div className="container">
      <Accordion activeKey={activeItem + ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Välj visning</Accordion.Header>
          <Accordion.Body><ScreeningListComponent setActiveItem={setActiveItem} setScreening={setScreening} /></Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1" >
          <Accordion.Header>2. Biljettyp och antal</Accordion.Header>
          <Accordion.Body>
            <TicketWithPriceComponent onGetTickets={getTickets} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>3. Välj platser</Accordion.Header>
          <Accordion.Body> <MovieSeatsComponent setActiveItem={setActiveItem} screening={screening} totalTickets={totalTickets} chosenSeats={chosenSeats} setChosenSeats={setChosenSeats}/> </Accordion.Body>
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
              <button onClick={submitBooking} className="btn btn-secondary btn-sm ms-2">
                Boka
              </button>
            </form>
            <div className="form-text">Vi kommer aldrig att dela din e-post med någon annan.</div>
            {!emailValid && <div className="text-danger">Vänligen ange en giltig email.</div>}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default MovieBookingComponent;
