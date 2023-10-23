import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "./MovieSeatsComponent.css";

let id = "652665cbac7404ee51b61940";

function MovieSeatsComponent() {
  useEffect(async () => {
    const result = await fetch("http://localhost:5003/api/screening/${id}");
    const data = await result.json();
    const seatingLayouts = data.seats;
    console.log(seatingLayouts);
  }, []);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatingLayout, setSeatingLayout] = useState(
    // Placeholder seating layout (modify this with your actual layout)
    // Each row is an array of seat status
    // "0" for available, "selected" for selected, and "booked" for booked
    [
      [0, 0, 0, 0, 0, 0, 0, 0], // Row 1
      [0, 0, 0, 0, 0, 0, 0, 0], // Row 2
      [0, 0, 0, "booked", "booked", 0, 0, 0], // Row 3
      [0, 0, 0, 0, 0, "booked", 0, 0], // Row 4
      [0, 0, 0, 0, 0, 0, 0], // Row 5
      [0, 0, 0, 0, 0, 0, 0], // Row 6
    ]
  );

  const [socket, setSocket] = useState(null);

  // Setup the socket
  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:5003");
    setSocket(newSocket);

    // Clean up: Disconnect the socket as the component unmounts
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket == null) return;

    const handleExternalSeatSelection = (seatInfo) => {
      setSeatingLayout((prev) => updateSeatingLayout(prev, seatInfo, "booked"));
    };

    const handleExternalSeatDeselection = (seatInfo) => {
      setSeatingLayout((prev) => updateSeatingLayout(prev, seatInfo, 0));
    };

    socket.on("seat-selected", handleExternalSeatSelection);
    socket.on("seat-unselected", handleExternalSeatDeselection);

    return () => {
      socket.off("seat-selected", handleExternalSeatSelection);
      socket.off("seat-unselected", handleExternalSeatDeselection);
    };
  }, [socket]);

  const updateSeatingLayout = (prevSeatingLayout, seatInfo, newStatus) => {
    return prevSeatingLayout.map((row, rowIndex) => {
      return row.map((seat, seatIndex) => {
        if (rowIndex === seatInfo.row && seatIndex === seatInfo.seat) {
          return newStatus;
        }
        return seat;
      });
    });
  };

  // Function to handle seat selection
  const handleSeatClick = (rowIndex, seatIndex) => {
    const selectedSeat = { row: rowIndex, seat: seatIndex };
    const isSelected = selectedSeats.some(
      (seat) => seat.row === selectedSeat.row && seat.seat === selectedSeat.seat
    );

    if (isSelected) {
      // Deselect seat
      const updatedSeats = selectedSeats.filter(
        (seat) => seat.row !== selectedSeat.row || seat.seat !== selectedSeat.seat
      );
      setSelectedSeats(updatedSeats);
      // Emit the "seat-unselected" event to the server
      if (socket) {
        socket.emit("seat-unselected", { row: rowIndex, seat: seatIndex });
      }
    } else {
      // Select seat
      const updatedSeats = [...selectedSeats, selectedSeat];
      setSelectedSeats(updatedSeats);
      // Emit the "seat-selected" event to the server
      if (socket) {
        socket.emit("seat-selected", { row: rowIndex, seat: seatIndex });
      }
    }
  };

  return (
    <div className="movie-wrap">
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>Available</small>
        </li>

        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>

        <li>
          <div className="seat booked"></div>
          <small>Booked</small>
        </li>
      </ul>
      <div className="seats-container">
        {/* Seating layout */}
        {seatingLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seatStatus, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${seatStatus}${
                  selectedSeats.some((seat) => seat.row === rowIndex && seat.seat === seatIndex)
                    ? " selected"
                    : ""
                }`}
                onClick={() => handleSeatClick(rowIndex, seatIndex)}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats
      </p>
      {selectedSeats.length > 0 && (
        <div className="seatInfo-container">
          <p>You have selected the seats:</p>
          <ul>
            {selectedSeats.map((seat, index) => (
              <li key={index}>
                Row {seat.row + 1}, Seats {seat.seat + 1}
              </li>
            ))}
          </ul>
          <button className="bookSeat-btn">Boka plats</button>
        </div>
      )}
    </div>
  );
}

export default MovieSeatsComponent;
