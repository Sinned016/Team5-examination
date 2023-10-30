import { useStates } from "react-easier"
import { useState } from "react"

// Made by Dennis and Mikael
export default function MovieSeatsComponent(props) {
  
  if(props.screening == "") {
    return;
  }

  const seats = props.screening.seats;
  const tickets = props.totalTickets;
  const setChosenSeats = props.setChosenSeats;

  const [isHovered, setIsHovered] = useState([]);
  const handleMouseEnter = (row, seat) => {
    let toMark = [];
    for (let i = 0; i < tickets; i++) {
      if (seat + tickets > 10) {
        seat = 10 - tickets
      }

      toMark.push([row, seat+i]);
    }
    setIsHovered(toMark);
  };
  const handleMouseLeave = (row, seat) => {setIsHovered([]);};




  function pickSeats(row, seat, seatState) {
    setChosenSeats([])

    if(seat + tickets > 10) {
      seat = 10 - tickets;
    }

    if (seatState === "occupied-seat") {
      console.log("Sätet är redan taget");
      return;
    }

    for(let i = 0; i < tickets; i++) {
      let pickedSeats = [row, seat + i];

      if (seats[row][seat + i] === 0) {
        setChosenSeats(prevState => ([...prevState, ...[pickedSeats]]));
      } else {
        console.log("Sätena efter är bokade");
        setChosenSeats([]);
      }
    }
  }

  const mappedSeats = seats.map((seatArray, rowIndex) => {
    return (
      <div className="theatre-row" key={rowIndex}>

          {seatArray.map((seat, seatIndex) => {
            return (
              <div 
                onClick={() => pickSeats(rowIndex, seatIndex, seat === 0 ? "available-seat" : "occupied-seat")} 
                onMouseEnter={() => handleMouseEnter(rowIndex, seatIndex)} 
                onMouseLeave={() => handleMouseLeave(rowIndex, seatIndex)} 
                key={`${rowIndex} ${seatIndex}`} 
                className={`${seat === 0 ? "available-seat" : "occupied-seat"} ${isHovered.find(([r,s]) => r === rowIndex && s === seatIndex) ? "hovered-seat" : ""}`}
              >
              </div>
            )
          })}
      </div>
    )
  })

  return (
    <>
      <div className="theatre-screen"></div>
      {mappedSeats}
    </>
  )
}