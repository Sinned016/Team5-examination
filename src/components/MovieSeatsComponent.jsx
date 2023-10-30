import { useStates } from "react-easier"
import { useState } from "react"

export default function MovieSeatsComponent(props) {
  
  if(props.screening == "") {
    return;
  }

  const seats = props.screening.seats;
  const tickets = props.totalTickets;
  const setChosenSeats = props.setChosenSeats;

  function pickSeats(row, seat, seatState) {
    setChosenSeats([])

    if(seat + tickets > 10) {
      alert("Du kan inte boka där");
      return;
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
              <div onClick={() => pickSeats(rowIndex, seatIndex, seat === 0 ? "available-seat" : "occupied-seat")} key={`${rowIndex} ${seatIndex}`} className={seat === 0 ? "available-seat" : "occupied-seat"}>
                {seatIndex}
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