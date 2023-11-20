import { useEffect } from "react";
import getCurrentDate from "../utils/getCurrentDate";
import { Container, Row, Col } from 'react-bootstrap';

export default function FilterDateComponent({earliestDate, latestDate, selectedDate, setSelectedDate}) {

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function resetDate() {
    setSelectedDate(getCurrentDate);
  }

  return (
    <div className="filterContainer">
      <input className="filterScreenings" type="date" required value={selectedDate} min={earliestDate} max={latestDate} onChange={handleDateChange} />
      <button className="resetBtn" onClick={resetDate}>Återställ</button>
    </div>
  )
}
