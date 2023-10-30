import { useStates } from "react-easier"
import { useState } from "react"

// Made by Dennis and Mikael
export default function MovieSeatsComponent(props) {
  
  if(props.screening == "") {
    return;
  }

  const seats = props.screening.seats;
  const tickets = props.totalTickets;
  const chosenSeats = props.chosenSeats;
  const setChosenSeats = props.setChosenSeats;

  function pickSeats(row, seat, seatState) {
    setChosenSeats([])

    if(seat + tickets > 10) {
      return;
    }

    if (seatState === "occupied-seat") {
      return;
    }

    for(let i = 0; i < tickets; i++) {
      let pickedSeats = [row, seat + i];

      if (seats[row][seat + i] === 0) {
        setChosenSeats(prevState => ([...prevState, ...[pickedSeats]]));
      } else {
        setChosenSeats([]);
      }
    }
  }

  const mappedSeats = seats.map((seatArray, rowIndex) => {
    return (
      <div className="theatre-row" key={rowIndex}>
        

          {seatArray.map((seat, seatIndex) => {
            const seatState = seat === 0 ? "available-seat" : "occupied-seat";
            const isSelected = chosenSeats.some(([row, seat]) => row === rowIndex && seat === seatIndex);
            const seatClass = isSelected ? `${seatState} selected-seat` : seatState;

            return (
              <div onClick={() => pickSeats(rowIndex, seatIndex, seat === 0 ? "available-seat" : "occupied-seat")} key={`${rowIndex} ${seatIndex}`} className={seatClass}>
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