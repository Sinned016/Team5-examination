import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../service/userService";
import fetchOptions from "../service/fetchService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MemberBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const email = userService.getUserEmail();
  const navigateToHome = useNavigate();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function formatDateWithWeekday(dateString) {
    const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("sv-SE", options);
    const [weekday, datePart] = formattedDate.split(", ");
    const [year, month, day] = datePart.split("-");
    return `${weekday}, ${day}-${month}-${year}`;
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const result = await userService.getUserBookings(email);
        setBookings(result);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [email]); // Dependency on 'email', if it changes, fetch bookings again

  const handleShowModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
  };

  const cancelBooking = async () => {
    setShowModal(false);
    if (!selectedBooking) return;
    try {
      const response = await fetch(
        `/api/bookings/${selectedBooking._id}`,
        fetchOptions("DELETE", { screeningId: selectedBooking.screeningId })
      );
      if (response.ok) {
        const updatedBookings = await userService.getUserBookings(email);
        setBookings(updatedBookings);
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
    }
  };

  let activeBookings = bookings.filter((booking) => new Date() <= new Date(booking.date));
  let oldBookings = bookings.filter((booking) => new Date() > new Date(booking.date));
  return (
    <>
      <div className="row mx-1 booking-container" style={{ marginBottom: "120px" }}>
        <h1>Mina bokningar </h1>
        <p>
          Du är inloggad som <span className="user-email">{email}</span>
        </p>
        <div className="mt-3 mb-1">
          <h2>Bokningsdetaljer</h2>
        </div>
        {activeBookings.length > 0 ? (
          activeBookings.map((booking, index) => (
            <div key={index} className="mb-4 table-dark">
              <div className="d-flex justify-content-between my-3">
                <div>Bokningsnummer</div>
                <div className="booking-info">{booking.bookingNumber}</div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Film</div>
                <div className="booking-info">{booking.movieTitle}</div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Datum</div>
                <div className="booking-info">
                  {booking.time}, {formatDateWithWeekday(booking.date)}
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Plats</div>
                <div className="booking-info">
                  {booking.theater}, Rad: {booking.seats[0][0] + 1}, Plats:{" "}
                  {booking.seats.length > 1
                    ? `${booking.seats[0][1] + 1}-${booking.seats[booking.seats.length - 1][1] + 1}`
                    : booking.seats[0][1] + 1}
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Kostnad (betalning sker på plats)</div>
                <div className="booking-info">{booking.price} kr</div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-outline-secondary py-2 m-3"
                  onClick={() => handleShowModal(booking)}
                >
                  AVBOKA
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Du har inga aktiva bokningar nu.</p>
        )}

        <div className="table-responsive mt-3 mb-1">
          <h2>Bokningshistorik</h2>
        </div>

        {oldBookings.length > 0 ? (
          oldBookings.map((booking, index) => (
            <div key={index} className="table-dark mb-4 d-flex justify-content-between py-3">
              <div className="booking-data">{booking.bookingNumber}</div>
              <div className="booking-data">{booking.movieTitle}</div>
              <div className="booking-data">{formatDateWithWeekday(booking.date)}</div>
              <div className="booking-data">{booking.price} kr</div>
            </div>
          ))
        ) : (
          <p>Du har inga gamla bokningar.</p>
        )}

        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={() => navigateToHome("/")}
            className="btn btn-outline-secondary py-2 mb-4 "
          >
            STARTSIDA
          </button>
        </div>
      </div>
      {/* Modal for cancellation confirmation */}
      {selectedBooking && (
        <Modal show={showModal} onHide={handleCloseModal} style={{ color: "#ededed" }}>
          <Modal.Header style={{ backgroundColor: "#2b2827" }}>
            <Modal.Title>Avbryt bokningen</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#c0c0c0", color: "black" }}>
            Är du säker på att avboka denna bokning?
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#c0c0c0" }}>
            <Button className="btn cancel-btn custom-hover-2 me-2" onClick={handleCloseModal}>
              Avbryt
            </Button>
            <Button className="btn login-btn custom-hover-2" onClick={cancelBooking}>
              Avboka
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default MemberBookingsPage;
