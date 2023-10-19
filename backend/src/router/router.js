import express from "express";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";
import emailService from "../service/emailService.js";

const router = express.Router();

// Räknar ut pris i backend
function addTotalPrice(barn, vuxen, pensionär) {
  const childPrice = barn * 80;
  const adultPrice = vuxen * 140;
  const seniorPrice = pensionär * 120;
  return childPrice + adultPrice + seniorPrice;
}

// Generera bokningsID
function generateId() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  const numbers = "0123456789";
  const numbersLength = numbers.length;

  for (let i = 0; i < 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  for (let j = 0; j < 2; j++) {
    result += numbers.charAt(Math.floor(Math.random() * numbersLength));
  }

  return result;
}

// get all movies
router.get("/movies", async (req, res) => {
  try {
    const movies = await fetchCollection("movies").find().toArray();
    res.status(200).send(movies);
  } catch (err) {
    res.status(500).send(err.clientMessage);
  }
});

//GET screenings
router.get("/screenings", async (req, res) => {
  try {
    const screenings = await fetchCollection("screenings").find().toArray();
    res.send(screenings);
  } catch (err) {
    res.status(500);
    res.send(err.clientMessage);
  }
});

// get all screenings with movie details
router.get("/screeningsAndMovies", async (req, res) => {
  try {
    const screeningsWithMovieDetails = await fetchCollection("screeningsWithMovieDetails")
      .find()
      .toArray();
    res.status(200).send(screeningsWithMovieDetails);
  } catch (err) {
    res.status(500).send(err.clientMessage);
  }
});

// get a specific movie and screenings for that movie
router.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;

  if (ObjectId.isValid(movieId)) {
    const movie = await fetchCollection("movies").findOne({
      _id: new ObjectId(movieId),
    });

    if (movie == null) {
      res.status(404).send({ error: "Could not fetch the document" });
    } else {
      movie.screenings = await fetchCollection("screenings").find({ movieId: movie._id }).toArray();
      res.status(200).send(movie);
    }
  } else {
    res.status(404).send({ error: "Could not fetch the document" });
  }
});

// get specific screening that the user picks with movie details
router.get("/screening/:id", async (req, res) => {
  const screeningId = req.params.id;

  if (ObjectId.isValid(screeningId)) {
    try {
      const screening = await fetchCollection("screeningsWithMovieDetails").findOne({
        _id: new ObjectId(screeningId),
      });
      res.status(200).send(screening);
    } catch (err) {
      res.status(500).send(err.clientMessage);
    }
  } else {
    res.status(404).send({ error: "Could not fetch the document" });
  }
});

// Making a booking and updating seats in screenings / Dennis / Mikael
router.put("/screening/:id", async (req, res) => {
  const screeningId = new ObjectId(req.params.id);
  const bookingInformation = req.body;
  const userEmail = bookingInformation.email; // Get userEmail in order to send out an email confirmation to it - Josefine

  const fullPrice = addTotalPrice(
    bookingInformation.barn,
    bookingInformation.vuxen,
    bookingInformation.pensionär
  );

  const bookingNumber = generateId();

  // Generate email content - Josefine
  const htmlContent = emailService.generateEmailTemplate(
    bookingInformation.bookedSeats,
    bookingNumber,
    fullPrice
  );

  if (bookingInformation.email == undefined || bookingInformation.bookedSeats == undefined) {
    return res.status(400).send("Missing information"); // 400: bad request
  }

  if (ObjectId.isValid(screeningId)) {
    const existingBooking = await fetchCollection("bookings").findOne({
      bookingNumber: bookingNumber,
    });

    if (existingBooking) {
      return res.status(404).send("A booking with this bookingNumber already exists");
    } else {
      const bookedResult = await fetchCollection("bookings").insertOne({
        email: bookingInformation.email,
        bookingNumber: bookingNumber,
        price: fullPrice,
        screeningId: screeningId,
      });

      const insertedId = bookedResult.insertedId;

      let results = {
        fullprice: fullPrice,
        bookedSeats: [],
      };
      for (let i = 0; i < bookingInformation.bookedSeats.length; i++) {
        const bookedSeatsString = `seats.${bookingInformation.bookedSeats[i][0]}.${bookingInformation.bookedSeats[i][1]}`;
        const result = await fetchCollection("screenings").updateOne(
          { _id: screeningId, [bookedSeatsString]: 0 },
          { $set: { [bookedSeatsString]: insertedId } }
        );
        if (result.modifiedCount === 1) {
          results.bookedSeats.push({
            result: `You booked seat ${bookingInformation.bookedSeats[i]}`,
          });
        } else {
          results.bookedSeats.push({
            error: `Seat ${bookingInformation.bookedSeats[i]} is already taken`,
          });
        }
      }
      res.send(results);
      // Send confirmation email to user when the seats are successfully booked
      try {
        const transporter = emailService.createTransporter();
        let mailOptions = {
          from: "filmvisarnateam@gmail.com",
          to: userEmail,
          subject: "Bokningsbekräftelse från Filmvisarna",
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
    }
  }
});

// Getting all bookings with the same mail as the logged in user (might change to Id later on)
router.get("/bookings/:email", async (req, res) => {
  const loggedInUserMail = req.params.email;

  try {
    const bookings = await fetchCollection("bookingWithTicketsAndScreening")
      .find({ email: loggedInUserMail })
      .toArray();
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send(err.clientMessage);
  }
});

// Delete booking and update seats
router.delete("/bookings/:id", async (req, res) => {
  const bookingId = req.params.id;

  if (ObjectId.isValid(bookingId)) {
    const booking = await fetchCollection("bookings").deleteOne({ _id: new ObjectId(bookingId) });

    if (booking.deletedCount == 0) {
      res.status(404).send({ error: "Could not delete the booking" });
    } else {
      const screening = await fetchCollection("screenings").findOne({
        _id: new ObjectId(req.body.screeningId),
      });

      for (let i = 0; i < screening.seats.length; i++) {
        for (let j = 0; j < screening.seats[i].length; j++) {
          const seat = screening.seats[i][j];

          if (
            seat &&
            ObjectId.isValid(seat) &&
            new ObjectId(seat).equals(new ObjectId(bookingId))
          ) {
            const deleteBookedSeat = `seats.${[i]}.${[j]}`;
            await fetchCollection("screenings").updateOne(
              { _id: new ObjectId(req.body.screeningId) },
              { $set: { [deleteBookedSeat]: 0 } }
            );
          }
        }
      }
      res
        .status(200)
        .send({ result: "You deleted your booking and the seats are now free again!" });
    }
  } else {
    res.status(404).send({ error: "Could not fetch the document" });
  }
});

export default router;
