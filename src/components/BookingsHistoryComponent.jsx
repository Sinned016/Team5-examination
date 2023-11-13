import React from 'react'
import { formatDateWithWeekday } from '../utils/formatDateWithWeekday'


export default function BookingsHistoryComponent({oldBookings, }) {
  return (
    <>
                <div className="table-responsive mt-3 mb-1">
          <h2>Bokningshistorik</h2>
        </div>

        {oldBookings.length > 0 ? (
          oldBookings.map((booking, index) => (
            <div key={index} className="table-dark mb-4 d-flex justify-content-between py-3">
              <div className="booking-data">{booking.bookingNumber}</div>
              <div className="booking-data">{booking.movieTitle}</div>
              <div className="booking-data">{formatDateWithWeekday(booking.date)}</div>
              <div className="booking-data">{booking.price} kr</div>
            </div>
          ))
        ) : (
          <p>Du har inga gamla bokningar.</p>
        )}
    </>
  )
}
