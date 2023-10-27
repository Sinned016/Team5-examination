import { useStates } from "react-easier"

export default function MovieSeatsComponent(props) {


  const seats = props.screening;
  console.log(seats)
  
  //  const mappedSeats = seats.map((seatArray, rowIndex) => {
  //    return (
  //        <div key={rowIndex}>
  //            <p>Row {rowIndex}</p>

  //            {seatArray.map((seat, seatIndex) => {
  //                return (
  //                    <div onClick={() => pickSeats(rowIndex, seatIndex)} key={seatIndex}>
  //                        <div className={seat[0] === 0 ? "seats" : "taken"}></div>
  //                    </div>
  //                )
  //            })}
  //        </div>
  //    )
  //  })


  // const mappedSeats = seats.map((seatArray, rowIndex) => {
  //   return (
  //     <div key={rowIndex}>
  //         <p>Row {rowIndex}</p>

  //         {seatArray}
  //     </div>
  //   )
  // })

  return (
    <div>
        MovieSeatsComponent
    </div>
  )
}