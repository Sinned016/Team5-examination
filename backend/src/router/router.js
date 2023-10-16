import express from "express";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";

const router = express.Router();

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

// get all movies
router.get("/movies", async (req, res) => {
    try {
        const movies = await fetchCollection("movies").find().toArray();
        res.status(200).send(movies);
    } catch(err) {
        res.status(500).send(err.clientMessage);
    }
});


// get a specific movie and screenings for that movie
router.get("/movie/:id", async (req, res) => {
  const movieId = req.params.id;

  if (ObjectId.isValid(movieId)) {
    const movie = await fetchCollection("movies").findOne({ _id: new ObjectId(movieId)});

    if (movie == null) {
        res.status(404).send({ error: "Could not fetch the document" });
    } else {
      movie.screenings = await fetchCollection("screenings").find({ movieId: movie._id }).toArray();
      res.status(200).send(movie);
    }
}});


// Making a booking and updating seats in screenings / Dennis / Mikael
router.put("/update/screening/:id", async (req, res) => {
    const screeningId = new ObjectId(req.params.id);
    const bookingInformation = req.body;
    if (
        bookingInformation.email == undefined ||
        bookingInformation.bookingNumber == undefined ||
        bookingInformation.bookedSeats == undefined
      ) {
        return res.status(400).send("Missing information"); // 400: bad request
      }

    if (ObjectId.isValid(screeningId)) {

        // Räkna ut pris i backend
        const result = await fetchCollection("bookings").insertOne({
            email: bookingInformation.email,
            bookingNumber: bookingInformation.bookingNumber,
            price: bookingInformation.price,
            screeningId: screeningId
        });

        if (!result.acknowledged) {
            res.status(404).send({ error: "Could not POST the document" });
        } else {

            for (let i = 0; i < bookingInformation.bookedSeats.length; i++) {
                const bookedSeatsString = `seats.${bookingInformation.bookedSeats[i][0]}.${bookingInformation.bookedSeats[i][1]}`;
                await fetchCollection("screenings").updateOne({_id: screeningId}, {$set: {[bookedSeatsString]: result.insertedId}});
            }

            res.status(200).send({hello: `You booked ${bookingInformation.bookedSeats.length} seats!`});
        }
    }
});


// Getting all bookings with the same mail as the logged in user (might change to Id later on)
router.get("/bookings/:email", async (req, res) => {
  const loggedInUserMail = req.params.email;

    try {
        const bookings = await fetchCollection("bookings").find({email: loggedInUserMail}).toArray();
        res.status(200).send(bookings);
    } catch(err) {
        res.status(500).send(err.clientMessage);
    }
});


export default router;
