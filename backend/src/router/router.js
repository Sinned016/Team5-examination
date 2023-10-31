import express from "express";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";
import emailService from "../service/emailService.js";
import userFilter from "../filter/userFilter.js";

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

// format date
function formatDateWithWeekday(dateString) {
  const options = { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString("sv-SE", options);
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
      res.status(404).send({ error: "Det gick inte att hämta dokumentet" });
    } else {
      movie.screenings = await fetchCollection("screenings").find({ movieId: movie._id }).toArray();
      res.status(200).send(movie);
    }
  } else {
    res.status(404).send({ error: "Det gick inte att hämta dokumentet" });
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
    res.status(404).send({ error: "Kunde inte hämta dokumentet" });
  }
});

// Making a booking and updating seats in screenings / Dennis / Mikael
router.put("/screening/:id", async (req, res) => {
  const screeningId = new ObjectId(req.params.id);
  const bookingInformation = req.body;
  const userEmail = bookingInformation.email; // Get userEmail in order to send out an email confirmation to it - Josefine

  console.log(bookingInformation);

  const fullPrice = addTotalPrice(
    bookingInformation.child,
    bookingInformation.adult,
    bookingInformation.senior
  );

  const bookingNumber = generateId();
  const bookedSeats = bookingInformation.bookedSeats;
  const date = bookingInformation.date;
  const formattedDate = formatDateWithWeekday(date);

  const row = bookedSeats[0][0] + 1;
  const seatNumbers = bookedSeats.map((seat) => seat[1] + 1);
  const seatRange = `rad ${row}, plats ${seatNumbers[0]}-${seatNumbers[seatNumbers.length - 1]}`;

  // Generate email content - Josefine
  const htmlContent = emailService.generateEmailTemplate(
    bookingNumber,
    bookingInformation.movieTitle,
    bookingInformation.time,
    //bookingInformation.date,
    formattedDate,
    bookingInformation.theater,
    seatRange,
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
      return res.status(404).send("En bokning med detta bokningsnummer finns redan");
    } else {
      const bookedResult = await fetchCollection("bookings").insertOne({
        email: bookingInformation.email,
        movieTitle: bookingInformation.movieTitle,
        theater: bookingInformation.theater,
        date: bookingInformation.date,
        time: bookingInformation.time,
        seats: bookingInformation.bookedSeats,
        bookingNumber: bookingNumber,
        price: fullPrice,
        screeningId: screeningId,
      });

      const insertedId = bookedResult.insertedId;

      let results = {
        email: bookingInformation.email,
        movieTitle: bookingInformation.movieTitle,
        theater: bookingInformation.theater,
        date: bookingInformation.date,
        time: bookingInformation.time,
        seats: bookingInformation.bookedSeats,
        fullPrice: fullPrice,
        bookingNumber: bookingNumber,
        screeningId: screeningId,
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
            result: `Du bokade säte ${bookingInformation.bookedSeats[i]}`,
          });
        } else {
          results.bookedSeats.push({
            error: `Säte ${bookingInformation.bookedSeats[i]} är upptaget`,
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
            res.status(500).send("Lyckades inte skicka e-mail."); // 500 Internal Server Error
          } else {
            console.log("Email skickat: " + info.response);
            res.status(200).send("Bokning och e-mail skickades.");
          }
        });
      } catch (error) {
        console.error("Misslyckades att skicka bekräftelsemail:", error);
        return res.status(500).send("Misslyckades att skicka e-mail.");
      }
    }
  }
});

// Getting all bookings with the same mail as the logged in user (might change to Id later on)
router.get("/bookings/:email", userFilter.authorize, async (req, res) => {
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
router.delete("/bookings/:id", userFilter.authorize, async (req, res) => {
  const bookingId = req.params.id;

  if (ObjectId.isValid(bookingId)) {
    const booking = await fetchCollection("bookings").deleteOne({ _id: new ObjectId(bookingId) });

    if (booking.deletedCount == 0) {
      res.status(404).send({ error: "Det gick inte att ta bort bokningen" });
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
      res.status(200).send({ result: "Du raderade din bokning och platserna är nu lediga" });
    }
  } else {
    res.status(404).send({ error: "Det gick inte att hämta dokumentet" });
  }
});

export default router;
