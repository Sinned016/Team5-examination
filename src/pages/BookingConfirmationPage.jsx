export default function BookingConfirmationPage() {
  // Test data to simulate a booking and map it out.
  const bookingData = {
    email: "test@gmail.com",
    bookingNumber: "ADC123",
    movieTitle: "Gladiator",
    theater: "salong 2",
    date: "2024-01-03",
    time: "18.00",
    seats: "rad 3, plats 13-15",
    price: 240,
    tickets: "1 vuxen, 2 barn",
  };

  return (
    <>
      <div>
        <h1>Tack för din bokning!</h1>
        <p>Bekräftelse skickas med e-post till {bookingData.email}</p>
        <div className="booking-details">
          <table>
            <tr>
              <td>Bokningsnummer:</td>
              <td>{bookingData.bookingNumber}</td>
            </tr>
            <tr>
              <td>Film:</td>
              <td>{bookingData.movieTitle}</td>
            </tr>
            <tr>
              <td>Datum:</td>
              <td>{bookingData.date}</td>
            </tr>
            <tr>
              <td>Plats:</td>
              <td>{bookingData.seats}</td>
            </tr>
            <tr>
              <td>Kostnad (betalning sker på plats):</td>
              <td>{bookingData.price} SEK</td>
            </tr>
          </table>
        </div>
        <h2>Vi ser fram emot ditt besök!</h2>
        <button>STARTSIDAN</button>
      </div>
    </>
  );
}
