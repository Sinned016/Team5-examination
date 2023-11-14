import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../service/userService";
import fetchOptions from "../service/fetchService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatDateWithWeekday } from "../utils/formatDateWithWeekday";
import BookingsComponent from "../components/BookingsComponent";
import BookingsHistoryComponent from "../components/BookingsHistoryComponent";

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

  let activeBookings = bookings.filter(
    (booking) => new Date() <= new Date(booking.date)
  );
  let oldBookings = bookings.filter(
    (booking) => new Date() > new Date(booking.date)
  );
  return (
    <>
      <div
        className="row mx-1 booking-container"
        style={{ marginBottom: "120px" }}>
        {/* Current bookings */}
        <BookingsComponent
          email={email}
          activeBookings={activeBookings}
          handleShowModal={handleShowModal}
        />

        {/* Old bookings */}
        <BookingsHistoryComponent oldBookings={oldBookings} />

        <div className="d-flex justify-content-center mt-5">
          <button
            onClick={() => navigateToHome("/")}
            className="startpage-btn btn btn-outline-secondary py-2 mb-4">
            STARTSIDA
          </button>
        </div>
      </div>

      {/* Modal for cancellation confirmation */}
      {selectedBooking && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="text-primary">
          <Modal.Header className="bg-info">
            <Modal.Title>Avbryt bokningen</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondary text-info">
            Är du säker på att avboka?
          </Modal.Body>
          <Modal.Footer className="bg-secondary">
            <Button
              className="btn cancel-btn custom-hover-2 me-2"
              onClick={handleCloseModal}>
              Avbryt
            </Button>
            <Button
              className="btn login-btn custom-hover-2"
              onClick={cancelBooking}>
              Avboka
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default MemberBookingsPage;
