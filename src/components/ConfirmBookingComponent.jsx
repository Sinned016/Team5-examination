import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function ConfirmBookingComponent({show, handleClose, totalTickets, screening, submitBooking}) {
  return (
    <>
        <Modal show={show} onHide={handleClose} style={{ color: "#ededed"}}>
            <Modal.Header style={{ backgroundColor: "#2b2827"}}>
            <Modal.Title >Bekräfta bokning</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ backgroundColor: "#c0c0c0", color: "black"}}>
            Är du säker på att boka <span style={{ fontWeight: "bold" }}>{totalTickets} </span>
            biljetter för filmen{" "}
            <span style={{ fontWeight: "bold" }}>
                {screening && screening.movieDetails && screening.movieDetails.length > 0
                ? screening.movieDetails[0].title
                : "ingen filmtitle"}
            </span>
            ?
            </Modal.Body>

            <Modal.Footer style={{ backgroundColor: "#c0c0c0"}}>
            <Button className="btn cancel-btn custom-hover-2 me-2" onClick={handleClose}>
                Avbryt
            </Button>
            <Button className="btn login-btn custom-hover-2" onClick={submitBooking}>
                Boka
            </Button>
            </Modal.Footer>
      </Modal>
    </>
  )
}
