import { useNavigate, useLocation } from "react-router-dom";

export default function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  function formatDateWithWeekday(dateString) {
    const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", options);
  }
  const formattedDate = formatDateWithWeekday(data.date);

  // Extracting the row number and seat numbers
  const row = data.seats[0][0] + 1;
  const seatNumbers = data.seats.map((seat) => seat[1] + 1);

  // Assuming seats are consecutive, use the first and the last seat number for the range
  const seatRange = `rad ${row}, plats ${seatNumbers[0]}-${seatNumbers[seatNumbers.length - 1]}`;

  // Function to process the seat data
  const bookingData = {
    email: data.email,
    bookingNumber: data.bookingNumber,
    movieTitle: data.movieTitle,
    theater: data.theater,
    date: formattedDate,
    time: data.time,
    seats: seatRange,
    price: data.fullPrice,
  };

  return (
    <>
      <div className="row mx-1 booking-details-container">
        <div className="my-4 d-flex justify-content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="132"
            height="132"
            fill="currentColor"
            className="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        </div>
        <h1 className="text-center">Tack för din bokning!</h1>
        <h4 className="text-center">Bekräftelse skickas med e-post till {bookingData.email}</h4>
        <h2 className="mt-3">Bokningsdetaljer</h2>
        <table className="table-dark table-border">
          <tbody>
            <tr>
              <td className="tdata-left">Bokningsnummer:</td>
              <td className="tdata-right">{bookingData.bookingNumber}</td>
            </tr>
            <tr>
              <td className="tdata-left">Film:</td>
              <td className="tdata-right">{bookingData.movieTitle}</td>
            </tr>
            <tr>
              <td className="tdata-left">Datum:</td>
              <td className="tdata-right">
                {bookingData.time}, {bookingData.date}
              </td>
            </tr>
            <tr>
              <td className="tdata-left">Plats:</td>
              <td className="tdata-right">
                {bookingData.theater}, {bookingData.seats}
              </td>
            </tr>
            <tr>
              <td className="tdata-left">Pris (betalning sker på plats):</td>
              <td className="tdata-right">{bookingData.price}kr</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 className="text-center mt-4 mb-4">Vi ser fram emot ditt besök!</h4>
      <div className="d-flex justify-content-center mb-5">
        <button onClick={() => navigate("/")} className="startpage-btn btn btn-outline-secondary py-2 mb-4">
          Startsida
        </button>
      </div>
    </>
  );
}
