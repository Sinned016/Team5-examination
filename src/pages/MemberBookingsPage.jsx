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
  }, [email]);

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
        <BookingsComponent
          email={email}
          activeBookings={activeBookings}
          handleShowModal={handleShowModal}
        />

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

      {selectedBooking && (
        <Modal show={showModal} onHide={handleCloseModal} className="text-primary">
          <Modal.Header className="modal-header bg-info">
            <Modal.Title>Avbryt bokning</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body bg-secondary text-info">
            <p className="text-center">Vill du ta bort denna bokning? </p>
            <p className="text-center">Film: {selectedBooking.movieTitle}</p>
            <p className="text-center">
              Datum: {selectedBooking.date} {selectedBooking.time}
            </p>
          </Modal.Body>
          <Modal.Footer className="modal-footer bg-secondary">
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
