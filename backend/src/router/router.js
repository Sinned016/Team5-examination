import express from "express";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";

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
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  const numbers = '0123456789';
  const numbersLength = numbers.length;

  for (let i = 0; i < 2; i++) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
  for (let j = 0; j < 2; j++) { result += numbers.charAt(Math.floor(Math.random() * numbersLength)); }

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
      const screeningsWithMovieDetails = await fetchCollection("screeningsWithMovieDetails").find().toArray();
      res.status(200).send(screeningsWithMovieDetails);
  } catch(err) {
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
      movie.screenings = await fetchCollection("screenings")
        .find({ movieId: movie._id })
        .toArray();
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
      const screening = await fetchCollection(
        "screeningsWithMovieDetails"
      ).findOne({ _id: new ObjectId(screeningId) });
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

  const fullPrice = addTotalPrice(
    bookingInformation.barn,
    bookingInformation.vuxen,
    bookingInformation.pensionär
  );

  const bookingNumber = generateId();

  if (
    bookingInformation.email == undefined ||
    bookingInformation.bookedSeats == undefined
  ) {
    return res.status(400).send("Saknad information"); // 400: bad request
  }

  if (ObjectId.isValid(screeningId)) {
    const existingBooking = await fetchCollection("bookings").findOne({
      bookingNumber: bookingNumber
    });

    if (existingBooking) {
      return res.status(404).send("En bokning med detta bokningsnummer finns redan")
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
          bookingNumber: bookingNumber,
          screeningId: screeningId,
          bookedSeats: []
        }
        for (let i = 0; i < bookingInformation.bookedSeats.length; i++) {
          const bookedSeatsString = `seats.${bookingInformation.bookedSeats[i][0]}.${bookingInformation.bookedSeats[i][1]}`;
          const result = await fetchCollection("screenings").updateOne(
            { _id: screeningId, [bookedSeatsString]: 0 }, 
            { $set: { [bookedSeatsString]: insertedId } });

        if (result.modifiedCount === 1) {
          results.bookedSeats.push({result: `Du bokade säte ${bookingInformation.bookedSeats[i]}`});
        } else {
          results.bookedSeats.push({error: `Säte ${bookingInformation.bookedSeats[i]} är upptaget`});
        }
      }
      res.send(results);
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

    if(booking.deletedCount == 0) {
      res.status(404).send({error: "Det gick inte att ta bort bokningen"});
    } else {

      const screening = await fetchCollection("screenings").findOne({ _id: new ObjectId(req.body.screeningId) });
  
      for (let i = 0; i < screening.seats.length; i++) {
        for (let j = 0; j < screening.seats[i].length; j++) {
          const seat = screening.seats[i][j];

          if (seat && ObjectId.isValid(seat) && new ObjectId(seat).equals(new ObjectId(bookingId))) {
            const deleteBookedSeat = `seats.${[i]}.${[j]}`;
            await fetchCollection("screenings").updateOne({ _id: new ObjectId(req.body.screeningId) }, { $set: {[deleteBookedSeat]: 0 }});
          }
        }
      }
      res.status(200).send({result: "Du raderade din bokning och platserna är nu lediga"});
    }

  } else {
    res.status(404).send({ error: "Det gick inte att hämta dokumentet" });
  }
});

export default router;