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
      movie.screenings = await fetchCollection("screenings")
        .find({ movieId: movie._id })
        .toArray();
      res.status(200).send(movie);
    }
  } else {
    res.status(404).send({ error: "ObjectId is not valid" });
  }
});

// Getting all bookings with the same mail as the logged in user (might change to Id later on)
router.get("/bookings/:email", async (req, res) => {
  const loggedInUserMail = req.params.email;

  try {
    const bookings = await fetchCollection("bookings")
      .find({ email: loggedInUserMail })
      .toArray();
    res.status(200).send(bookings);
  } catch (err) {
    res.status(500).send(err.clientMessage);
  }
});

// POST booking information
router.post("/book/screening", async (req, res) => {
  const bookingInformation = req.body;

  // check for required fields
  if (
    bookingInformation.email == undefined ||
    bookingInformation.bookingNumber == undefined ||
    bookingInformation.seats == undefined ||
    bookingInformation.price == undefined ||
    bookingInformation.screening_id == undefined
  ) {
    return res.status(400).send("Missing information"); // 400: bad request
  }

  try {
    // insert the new booking into the database
    let result = await fetchCollection("bookings").insertOne({
      email: bookingInformation.email,
      bookingNumber: bookingInformation.bookingNumber,
      seats: bookingInformation.seats,
      price: bookingInformation.price,
      screening_id: bookingInformation.screening_id,
    });
    
    // if successful, return the new booking
    if (result.insertedCount > 0) {
      return res.status(201).send(result.ops[0]); // 201: created
    } else {
      return res.status(500).send("An error occurred while booking"); // 500: internal server error
    }
  } catch (error) {
    // if an error occurred, return it
    return res.status(500).send(error.message); // 500: internal server error
  }
});

export default router;
