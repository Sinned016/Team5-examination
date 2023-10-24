export default function BookingConfirmationPage() {
  return (
    <>
      <div>
        <h1>Tack för din bokning!</h1>
        <p>Bekräftelse skickas med epost till email</p>
        {/* Lägg in funktion att plocka ut mail som användare skriver in. */}
        <div className="booking-details">
          <p>Bokningsnummer:</p>
          <p>Film:</p>
          <p>Datum:</p>
          <p>Plats:</p>
          <p>Kostnad (betalning sker på plats)</p>
        </div>
        <h2>Vi ser fram emot ditt besök!</h2>
        <button>STARTSIDAN</button>
      </div>
    </>
  );
}
