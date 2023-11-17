import React from 'react'
import { formatDateWithWeekday } from '../utils/formatDateWithWeekday'


export default function BookingsHistoryComponent({oldBookings, }) {
  return (
    <>
                <div className="table-responsive mt-3 mb-1">
          <h2>Bokningshistorik</h2>

          {/* Kommentar */}

        </div>
        {oldBookings.length > 0 ? (
          oldBookings.map((booking, index) => (
            <div key={index} className="mb-4 table-dark">
            {/* <div className="d-flex justify-content-between my-3">
              <div>Bokningsnummer</div>
              <div className="booking-info">{booking.bookingNumber}</div>
            </div> */}
            <div className="d-flex justify-content-between my-3">
              <div>Film</div>
              <div className="booking-info">{booking.movieTitle}</div>
            </div>
            <div className="d-flex justify-content-between my-3">
              <div>Datum</div>
              <div className="booking-info">
                {formatDateWithWeekday (booking.date)}
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
              <div>Kostnad</div>
              <div className="booking-info">{booking.price} kr</div>
            </div>

            <div className="d-flex justify-content-center">
            </div>
          </div>

                  // Gamla exemplet

            // <div key={index} className="table-dark mb-4 d-flex justify-content-between py-3">
            //   <div className="booking-data">{booking.bookingNumber}</div>
            //   <div className="booking-data">{booking.movieTitle}</div>
            //   <div className="booking-data">{formatDateWithWeekday(booking.date)}</div>
            //   <div className="booking-data">{booking.price} kr</div>
            // </div>
          ))
        ) : (
          <p>Du har inga gamla bokningar.</p>
        )}
    </>
  )
}
