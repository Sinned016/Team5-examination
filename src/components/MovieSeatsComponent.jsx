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
  const setActiveItem = props.setActiveItem;

  const [isHovered, setIsHovered] = useState([]); // eslint-disable-line
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
    
    const takenSeat = "Säte upptaget, välj en annan plats!";

    if(seat + tickets > 10) {
      seat = 10 - tickets;
    }

    if (seatState.includes("occupied-seat")) {
      alert(takenSeat)
      return;
    }

    for(let i = 0; i < tickets; i++) {
      let pickedSeats = [row, seat + i];

      if (seats[row][seat + i] === 0) {
        setChosenSeats(prevState => ([...prevState, ...[pickedSeats]]));
      } else {
        alert(takenSeat)
        setChosenSeats([]);
      }
    }
  }

  function setActive() {
    if (chosenSeats.length > 0) {
      setActiveItem(3);
    } else {
      alert("Välj säten innan du fortsätter");
    }
  }

  const mappedSeats = seats.map((seatArray, rowIndex) => {
    return (
      <div className="theatre-row" key={rowIndex}>
        
        {seatArray.map((seat, seatIndex) => {
          const seatState = `${seat === 0 ? "available-seat" : "occupied-seat"} ${isHovered.find(([r,s]) => r === rowIndex && s === seatIndex) ? "hovered-seat" : ""}`;
          const isSelected = chosenSeats.some(([row, seat]) => row === rowIndex && seat === seatIndex);
          const seatClass = isSelected ? `${seatState} selected-seat` : seatState;

          return (
            <div 
              onClick={() => pickSeats(rowIndex, seatIndex, seat === 0 ? "available-seat" : "occupied-seat")} 
              onMouseEnter={() => handleMouseEnter(rowIndex, seatIndex)} 
              onMouseLeave={() => handleMouseLeave(rowIndex, seatIndex)} 
              key={`${rowIndex} ${seatIndex}`} 
              className={seatClass}></div>
          )
        })}
      </div>
    )
  })

  return (
    <>
      <div className="theatre-screen"></div>
      {mappedSeats}
      <button className="btn login-btn" onClick={setActive}>Välj plats</button>
    </>
  )
}