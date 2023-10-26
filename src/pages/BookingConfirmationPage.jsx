export default function BookingConfirmationPage() {
  // Test data to simulate a booking and map it out.
  const bookingData = {
    email: "test@gmail.com",
    bookingNumber: "ADC123",
    movieTitle: "Gladiator",
    theater: "salong 2",
    date: "lör. 23 sep",
    time: "18.00",
    seats: "rad 3, plats 13-15",
    price: 240,
    tickets: "1 vuxen, 2 barn",
  };

  return (
    <>
      <div className="booking-details-container">
        <h1 className="text-center">Tack för din bokning!</h1>
        <h3 className="text-center">
          Bekräftelse skickas med e-post till {bookingData.email}
        </h3>
        <h2>Bokningsdetaljer</h2>
        <div className="booking-details-card">
          <table className="table">
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
                {bookingData.date}, {bookingData.time}
              </td>
            </tr>
            <tr>
              <td className="tdata-left">Plats:</td>
              <td className="tdata-right">{bookingData.seats}</td>
            </tr>
            <tr>
              <td className="tdata-left">Pris (betalning sker på plats):</td>
              <td className="tdata-right">{bookingData.price} SEK</td>
            </tr>
          </table>
        </div>
        <h2 className="text-center mt-4 mb-4">Vi ser fram emot ditt besök!</h2>
        <button className="home-btn">STARTSIDAN</button>
      </div>
    </>
  );
}