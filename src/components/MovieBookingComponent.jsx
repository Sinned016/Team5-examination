import Accordion from "react-bootstrap/Accordion";
import "./MovieBookingComponent.css";

function MovieBookingComponent() {
  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>1. Välj visning</Accordion.Header>
        <Accordion.Body>placeholder for dates of screenings</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>2. Biljettyp och antal</Accordion.Header>
        <Accordion.Body>placeholder for Biljettyp och antal </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>3. Välj platser</Accordion.Header>
        <Accordion.Body>placeholder for seats of a screening</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>4. Bekräfta</Accordion.Header>
        <Accordion.Body>
          <p>
            <input placeholder="email@email.com"></input>
            <button>Boka</button>
          </p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default MovieBookingComponent;
