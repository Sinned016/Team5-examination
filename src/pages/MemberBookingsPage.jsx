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

  let activeBookings = bookings.filter(booking => new Date() <= new Date(booking.date));
  let oldBookings = bookings.filter(booking => new Date() > new Date(booking.date))
  return (
    <>
      <div className="row mx-1 booking-details-container">
        <h1>Mina bokningar </h1>
        <p>Du är inloggad som {email}</p>
        <div className="table-responsive mt-4 mb-2">
          <h2>Bokningsdetaljer</h2>
        </div>
        {activeBookings.length > 0
          ? activeBookings.map((booking, index) => (
              <div key={index} className="mb-4">
                <table key={index} className="table-dark table-border mb-4">
                  <tbody>
                    <tr>
                      <td className="tdata-left">Bokningsnummer</td>
                      <td className="tdata-right">{booking.bookingNumber}</td>
                    </tr>
                    <tr>
                      <td className="tdata-left">Film</td>
                      <td className="tdata-right">{booking.movieTitle}</td>
                    </tr>
                    <tr>
                      <td className="tdata-left">Datum</td>
                      <td className="tdata-right">
                        {booking.date} {booking.time}
                      </td>
                    </tr>
                    <tr>
                      <td className="tdata-left">Plats</td>
                      <td className="tdata-right">Rad: {booking.seats[0][0] + 1}, Plats: {booking.seats[0][1] + 1}-{booking.seats[booking.seats.length - 1][1] + 1}</td>
                    </tr>
                    <tr>
                      <td className="tdata-left">Pris (betalning sker på plats)</td>
                      <td className="tdata-right">{booking.price} kr</td>
                    </tr>
                  </tbody>
                </table>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-secondary py-2 mb-4"
                    onClick={() => handleShowModal(booking)}
                  >
                    AVBOKA
                  </button>
                </div>
              </div>
            ))
          : "Du har inga aktiva bokningar nu."}

        <div className="table-responsive mt-4 mb-2">
          <h2>Bokningshistorik</h2>
        </div>
        <table className="table-dark table-border mb-4">
          <thead>
            <th className="tdata-left">Bokningsnr</th>
            <th className="tdata-left">Film</th>
            <th className="tdata-left">Datum</th>
            <th className="tdata-left">Pris</th>
          </thead>
          {oldBookings.length > 0
          ? oldBookings.map((booking, index) => (
            <tbody key={index} className="">
              <tr className="align-bottom">
                <td className="tdata-left">{booking.bookingNumber}</td>
                <td className="tdata-left">{booking.movieTitle}</td>
                <td className="tdata-left">
                  {booking.date} {booking.time}
                </td>

                <td className="tdata-left">{booking.price} kr</td>
              </tr>
            </tbody>
          )) : <td colSpan="4" className="px-2">Du har inga gamla bokningar.</td>}
        </table>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button
          onClick={() => navigateToHome("/")}
          className="btn btn-outline-secondary py-2 mb-4 "
        >
          STARTSIDA
        </button>
      </div>

      {/* Modal for cancellation confirmation */}
      {selectedBooking && (
        <Modal show={showModal} onHide={handleCloseModal} style={{ color: "black" }}>
          <Modal.Header closeButton>
            <Modal.Title>Avbryt bokningen</Modal.Title>
          </Modal.Header>
          <Modal.Body>Är du säker på att avboka denna bokning?</Modal.Body>
          <Modal.Footer>
            <Button className="btn cancel-btn custom-hover-2 me-2" onClick={handleCloseModal}>
              AVBRYT
            </Button>
            <Button className="btn login-btn custom-hover-2" onClick={cancelBooking}>
              JA
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default MemberBookingsPage;
