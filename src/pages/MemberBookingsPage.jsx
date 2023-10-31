import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../service/userService";

function MemberBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const email = userService.getUserEmail();

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

  const navigateToHome = useNavigate();

  return (
    <>
    <h1>Mina bokningar </h1>
    <div className="booking-history-container" >
    <h2>Bokningsdetaljer</h2>
      
      {bookings.map((booking, index) => (
      <table key={index} className="table-dark table-border">
    
          <tbody>
          
            <tr>
              <td className="tdata-left">Bokningsnummer</td>
              <td className="tdata-right">{booking.bookingNumber}</td>
            </tr>
            <tr>
              <td className="tdata-left">Film</td>
              <td className="tdata-right">{booking.movieTitle}</td>
            </tr>
            <tr>
              <td className="tdata-left">Datum</td>
              <td className="tdata-right">
                {booking.date} {booking.time}
              </td>
            </tr>
            <tr>
              <td className="tdata-left">Plats</td>
              <td className="tdata-right">{booking.seats}</td>
            </tr>
            <tr>
              <td className="tdata-left">Pris (betalning sker på plats)</td>
              <td className="tdata-right">{booking.price} SEK</td>
            </tr>
            <button className="btn btn-outline-secondary py-2 mb-4" >AVBOKA</button>
          </tbody>
        </table>  ))}
        </div>
  



    <div className="booking-history-container" >
    <h2>Bokningshistorik</h2>
   
      <table className="table-dark table-border">
        <thead>
          <th>Bokningsnr</th>
          <th>Film</th>
          <th>Datum</th>
          <th>Pris</th>
        </thead>
              {bookings.map((booking, index) => (
          <tbody key={index}>

            <tr>
              <td className="tdata-right">{booking.bookingNumber}</td>
          
             
              <td className="tdata-right">{booking.movieTitle}</td>
            
              <td className="tdata-right">
                {booking.date} {booking.time}
              </td>
              
         
              <td className="tdata-right">{booking.price} SEK</td>
              </tr>
          </tbody> ))}
        </table>
        <button onClick={() => navigateToHome("/")} className="btn btn-outline-secondary py-2 mb-4" >STARTSIDA</button>
        </div>
    </>
  );
}

export default MemberBookingsPage;


