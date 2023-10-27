import { useState } from "react";

export default function TestBooking() {
    const [seats, setSeats] = useState([
        [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
        ],
        [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
        ],
        [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
        ],
        [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
        ],
        [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
        ],
    ])

    const [chosenSeats, setChosenSeats] = useState([
        [0, 1],
    ]);

    function pickSeats(row, seat) {
        const pickedSeats = [row, seat]
        setChosenSeats(prevState => ([...prevState, ...[pickedSeats]]))
    }

    console.log(seats);
    console.log(chosenSeats);

    const mappedSeats = seats.map((seatArray, rowIndex) => {

        return (
            <div key={rowIndex}>
                <p>Row {rowIndex}</p>

                {seatArray.map((seat, seatIndex) => {
                    return (
                        <div onClick={() => pickSeats(rowIndex, seatIndex)} key={seatIndex}>
                            <div className={seat[0] === 0 ? "seats" : "taken"}></div>
                        </div>
                    )
                })}
            </div>
        )
    })


  return (
    <div>
        <h1>TestBooking</h1>

        {mappedSeats}
    </div>
  )
}
