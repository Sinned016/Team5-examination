import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../service/userService";
import fetchOptions from "../service/fetchService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

  let activeBookings = bookings.filter((booking) => new Date() <= new Date(booking.date));
  let oldBookings = bookings.filter((booking) => new Date() > new Date(booking.date));
  return (
    <>
      <div className="row mx-1 booking-container" style={{ marginBottom: "120px" }}>
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
            className="startpage-btn btn btn-outline-secondary py-2 mb-4"
          >
            Startsida
          </button>
        </div>
      </div>

      {/* Modal for cancellation confirmation */}
      {selectedBooking && (
        <Modal show={showModal} onHide={handleCloseModal} className="text-primary">
          <Modal.Header className="modal-header border-0 bg-info">
            <Modal.Title>Avbryt bokning</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body bg-secondary text-info">
            Vill du ta bort denna bokning?
          </Modal.Body>
          <Modal.Footer className="modal-footer border-0 bg-secondary">
            <Button className="modal-undo-btn btn cancel-btn" onClick={handleCloseModal}>
              Avbryt
            </Button>
            <Button className="modal-cancel-btn btn cancel-btn" onClick={cancelBooking}>
              Avboka
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default MemberBookingsPage;
