import getCurrentDate from "../service/getCurrentDate";
import { Container, Row, Col } from 'react-bootstrap';

export default function FilterDateComponent({earliestDate, latestDate, selectedDate, setSelectedDate}) {
  
  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  function resetDate() {
    setSelectedDate(getCurrentDate);
  }

  return (
    <div className="screeningsFilter">
      <label htmlFor="">Filtrera på datum</label>
      <input type="date" id="" name="" value={selectedDate} min={earliestDate} max={latestDate} onChange={handleDateChange}/>
      <button className="confirm-button" onClick={resetDate}>Återställ</button>
    </div>
  )
}
