export function resetBooking(identifier, setScreening, setTotalTickets, setChosenSeats, setActiveItem) {
    console.log(identifier);
    if (identifier === "screening") {
      setScreening("");
      setTotalTickets(0);
      setChosenSeats([]);
      setActiveItem(0);
    } else if (identifier === "ticketType") {
      setTotalTickets(0);
      setChosenSeats([]);
      setActiveItem(1);
    } else if (identifier === "seats") {
      setChosenSeats([]);
      setActiveItem(2);
    }
}