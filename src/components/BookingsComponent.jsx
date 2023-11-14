import React from 'react'
import { formatDateWithWeekday } from '../utils/formatDateWithWeekday'

export default function BookingsComponent({email, activeBookings, handleShowModal}) {
  return (
    <>
        <h1>Mina bokningar </h1>
        <p>
          Du är inloggad som <span className="user-email">{email}</span>
        </p>
        <div className="mt-3 mb-1">
          <h2>Bokningsdetaljer</h2>
        </div>
        {activeBookings.length > 0 ? (
          activeBookings.map((booking, index) => (
            <div key={index} className="mb-4 table-dark">
              <div className="d-flex justify-content-between my-3">
                <div>Bokningsnummer</div>
                <div className="booking-info">{booking.bookingNumber}</div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Film</div>
                <div className="booking-info">{booking.movieTitle}</div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Datum</div>
                <div className="booking-info">
                  {booking.time}, {formatDateWithWeekday(booking.date)}
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Plats</div>
                <div className="booking-info">
                  {booking.theater}, Rad: {booking.seats[0][0] + 1}, Plats:{" "}
                  {booking.seats.length > 1
                    ? `${booking.seats[0][1] + 1}-${booking.seats[booking.seats.length - 1][1] + 1}`
                    : booking.seats[0][1] + 1}
                </div>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>Kostnad (betalning sker på plats)</div>
                <div className="booking-info">{booking.price} kr</div>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="cancel-booking-btn btn btn-outline-secondary py-2 m-3"
                  onClick={() => handleShowModal(booking)}
                >
                  Avboka
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Du har inga aktiva bokningar.</p>
        )}
    </>
  )
}
