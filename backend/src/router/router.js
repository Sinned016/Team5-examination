import express from "express";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";
import nodemailer from "nodemailer";
import emailService from "../service/emailService.js";

// Setup nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "filmvisarnateam@gmail.com",
    pass: "kjsm pgpm bpou ypek",
  },
});

const router = express.Router();

// Räknar ut pris i backend
function addTotalPrice(barn, vuxen, pensionär) {
  const childPrice = barn * 80;
  const adultPrice = vuxen * 140;
  const seniorPrice = pensionär * 120;
  return childPrice + adultPrice + seniorPrice;
}

// Making a booking and updating seats in screenings / Dennis / Mikael
router.put("/screening/:id", async (req, res) => {
  const screeningId = new ObjectId(req.params.id);
  const bookingInformation = req.body;
  const userEmail = bookingInformation.email; // Josefine added

  if (bookingInformation.email == undefined || bookingInformation.bookedSeats == undefined) {
    return res.status(400).send("Missing information"); // 400: bad request
  }

  const fullPrice = addTotalPrice(
    bookingInformation.barn,
    bookingInformation.vuxen,
    bookingInformation.pensionär
  );

  if (ObjectId.isValid(screeningId)) {
    const existingBooking = await fetchCollection("bookings").findOne({
      bookingNumber: bookingInformation.bookingNumber,
    });

    if (existingBooking) {
      return res.status(404).send("A booking with this bookingNumber already exists");
    } else {
      const bookedResult = await fetchCollection("bookings").insertOne({
        email: bookingInformation.email,
        bookingNumber: bookingInformation.bookingNumber,
        price: fullPrice,
        screeningId: screeningId,
      });

      const insertedId = bookedResult.insertedId;

      let results = [];
      for (let i = 0; i < bookingInformation.bookedSeats.length; i++) {
        const bookedSeatsString = `seats.${bookingInformation.bookedSeats[i][0]}.${bookingInformation.bookedSeats[i][1]}`;
        const result = await fetchCollection("screenings").updateOne(
          { _id: screeningId, [bookedSeatsString]: 0 },
          { $set: { [bookedSeatsString]: insertedId } }
        );

        if (result.modifiedCount === 1) {
          results.push({
            result: `You booked seat ${bookingInformation.bookedSeats[i]}`,
            price: fullPrice,
          });
        } else {
          results.push({ error: `Seat ${bookingInformation.bookedSeats[i]} is already taken` });
        }
      }
      res.send(results);
    }
  }

  // After successfully booking the seats
  // Send confirmation email when the seats are successfully booked
  let htmlContent = emailService.generateEmailTemplate(bookingInformation);

  try {
    let mailOptions = {
      from: "filmvisarnateam@gmail.com",
      to: userEmail,
      subject: "Confirmation of your movie booking - Filmvisarna",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Failed to send email"); // 500 Internal Server Error
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Booking and Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return res.status(500).send("Failed to send email");
  }
});

export default router;
