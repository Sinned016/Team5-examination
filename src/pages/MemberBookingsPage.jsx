import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../service/userService";
import fetchOptions from "../service/fetchService";


function MemberBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const email = userService.getUserEmail();
  const navigateToHome = useNavigate();

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

  

  const cancelBooking = async (bookingId, screeningId) => {
    
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, fetchOptions('DELETE', { screeningId }));
      console.log(response);
      if (response.ok) {
        const result = await userService.getUserBookings(email);
        setBookings(result);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <div className="row mx-1 booking-details-container">
    <h1>Mina bokningar </h1>
    <div className="table-responsive mt-4 mb-2">
    <h2>Bokningsdetaljer</h2>
    </div>
    

      {bookings.map((booking, index) => (
      <table key={index} className="table-dark table-border mb-4">
    
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
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-secondary py-2 mb-4" onClick={() => cancelBooking(booking._id, booking.screeningId)} >AVBOKA</button>
            </div>
          </tbody>
        </table>  ))}
        
  

        <div className="table-responsive mt-4 mb-2">
    <h2>Bokningshistorik</h2>
    </div>  
      <table className="table-dark table-border mb-4">
        <thead>
          <th className="tdata-left">Bokningsnr</th>
          <th className="tdata-left">Film</th>
          <th className="tdata-left">Datum</th>
          <th className="tdata-left">Pris</th>
        </thead>
              {bookings.map((booking, index) => (
          <tbody key={index} className="">

            <tr className="align-bottom">
              <td className="tdata-left">{booking.bookingNumber}</td>
              <td className="tdata-left">{booking.movieTitle}</td>
              <td className="tdata-left">
                {booking.date} {booking.time}
              </td>
              
         
              <td className="tdata-left">{booking.price} SEK</td>
              </tr>
          </tbody> ))}
        </table>
        </div>
        <div className="d-flex justify-content-center mt-5">
        <button onClick={() => navigateToHome("/")} className="btn btn-outline-secondary py-2 mb-4 " >STARTSIDA</button>
        </div>
    </>
  );
}

export default MemberBookingsPage;
