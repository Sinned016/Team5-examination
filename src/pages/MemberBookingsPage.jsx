import React, { useState, useEffect } from "react";
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

  return (
    <>
      <h1>This page is to show member's bookings</h1>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {/* Render booking details */}
            {booking.email}
            {booking.bookingNumber}
            {booking.price}
            {booking.seats}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MemberBookingsPage;
