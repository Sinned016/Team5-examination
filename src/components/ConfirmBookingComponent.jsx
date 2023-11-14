import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function ConfirmBookingComponent({show, handleClose, totalTickets, screening, submitBooking}) {
  return (
    <>
        <Modal show={show} onHide={handleClose} style={{ color: "#ededed"}}>
            <Modal.Header className="border-0" style={{ backgroundColor: "#2b2827"}}>
            <Modal.Title >Bekräfta bokning</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "#c0c0c0", color: "black"}}>
            Vill du boka <span style={{ fontWeight: "bold" }}>{totalTickets} </span>
            biljetter för filmen{" "}
            <span style={{ fontWeight: "bold" }}>
                {screening && screening.movieDetails && screening.movieDetails.length > 0
                ? screening.movieDetails[0].title
                : "ingen filmtitel"}
            </span>
            ?
            </Modal.Body>

            <Modal.Footer className="border-0" style={{ backgroundColor: "#c0c0c0"}}>
            <Button className="modal-cancel-btn btn cancel-btn" onClick={handleClose}>
                Avbryt
            </Button>
            <Button className="modal-undo-btn btn cancel-btn" onClick={submitBooking}>
                Boka
            </Button>
            </Modal.Footer>
      </Modal>
    </>
  )
}
