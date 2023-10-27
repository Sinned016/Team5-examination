import { useStates } from "react-easier"
import { useState } from "react"

export default function MovieSeatsComponent(props) {
  const [chosenSeats, setChosenSeats] = useState([
    [0, 1],
  ]);

  if(props.screening == "") {
    return;
  }

  const seats = props.screening.seats;

  function pickSeats(row, seat) {
    const pickedSeats = [row, seat];
    setChosenSeats(prevState => ([...prevState, ...[pickedSeats]]));
  }

  console.log(chosenSeats);

  const mappedSeats = seats.map((seatArray, rowIndex) => {
    return (
      <div key={rowIndex}>
          <p>Row {rowIndex}</p>

          {seatArray.map((seat, seatIndex) => {
            return (
              <div onClick={() => pickSeats(rowIndex, seatIndex)} key={`${rowIndex} ${seatIndex}`} className={seat === 0 ? "available" : "taken"}>
                {seatIndex}
              </div>
            )
          })}
      </div>
    )
  })

  return (
    <div>
        {mappedSeats}
    </div>
  )
}