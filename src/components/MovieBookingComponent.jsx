import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import "./MovieBookingComponent.css";
import TicketWithPriceComponent from "./TicketWithPriceComponent";
import MovieSeatsComponent from "./MovieSeatsComponent";

function MovieBookingComponent() {
  const [adultTickets, setAdultTickets] = useState(0);
  const [seniorTickets, setSeniorTickets] = useState(0);
  const [childTickets, setChildTickets] = useState(0);

  function getTickets(adultTickets, seniorTickets, childTickets) {
    setAdultTickets(adultTickets);
    setSeniorTickets(seniorTickets);
    setChildTickets(childTickets);
    console.log("adult:", adultTickets, "senior:", seniorTickets, "child:", childTickets);
  }
  return (
    <div className="container">
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>1. Välj visning</Accordion.Header>
          <Accordion.Body>placeholder for dates of screenings</Accordion.Body>
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
            <MovieSeatsComponent />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>4. Bekräfta</Accordion.Header>
          <Accordion.Body>
            <p>
              <input placeholder="email@email.com"></input>
              <button className="btn btn-secondary btn-sm ms-2">Boka</button>
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default MovieBookingComponent;
