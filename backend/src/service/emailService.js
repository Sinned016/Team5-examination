function generateEmailTemplate(bookingInformation) {
  return `
      <div style="width: 50%; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color:#333;">Tack för din bokning!</h2>
        <p> Bokningsdetaljer:</p>
  
        <table style="width: 50%; margin-top: 20px; border-collapse: collapse;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd;">Bokningsnummer/td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingInformation.bookingNumber}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Plats</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingInformation.bookedSeats}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd;">Kostnad(betalning sker på plats)</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${bookingInformation.fullPrice}</td>
          </tr>

        </table>
      </div>
    `;
}

export default { generateEmailTemplate };
