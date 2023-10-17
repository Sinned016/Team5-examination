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
    res.status(404).send({ error: "Could not fetch the document" });
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
    res.status(404).send({ error: "Could not fetch the document" });
  }
});

// Making a booking and updating seats in screenings / Dennis / Mikael
router.put("/update/screening/:id", async (req, res) => {
  const screeningId = new ObjectId(req.params.id);
  const bookingInformation = req.body;

  // Räknar ut pris i backend
  function addTotalPrice(barn, vuxen, pensionär) {
    const childPrice = barn * 80;
    const adultPrice = vuxen * 140;
    const seniorPrice = pensionär * 120;
    return childPrice + adultPrice + seniorPrice;
  }

  const fullPrice = addTotalPrice(
    bookingInformation.barn,
    bookingInformation.vuxen,
    bookingInformation.pensionär
  );

  if (
    bookingInformation.email == undefined ||
    bookingInformation.bookedSeats == undefined
  ) {
    return res.status(400).send("Missing information"); // 400: bad request
  }

  if (ObjectId.isValid(screeningId)) {
    const result = await fetchCollection("bookings").insertOne({
      email: bookingInformation.email,
      bookingNumber: bookingInformation.bookingNumber,
      price: fullPrice,
      screeningId: screeningId,
    });

    if (!result.acknowledged) {
      res.status(404).send({ error: "Could not POST the document" });
    } else {
      for (let i = 0; i < bookingInformation.bookedSeats.length; i++) {
        const bookedSeatsString = `seats.${bookingInformation.bookedSeats[i][0]}.${bookingInformation.bookedSeats[i][1]}`;
        await fetchCollection("screenings").updateOne(
          { _id: screeningId },
          { $set: { [bookedSeatsString]: result.insertedId } }
        );
      }

      res
        .status(200)
        .send({
          hello: `You booked ${bookingInformation.bookedSeats.length} seats! Price: ${fullPrice}`,
        });
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

router.delete("/bookings/:_id", async (req, res) => {
  //Ändrat bookingID till :_id
  const bookingId = req.params.bookingId; //Ändrat bookingID till _id
  const userEmail = req.body.userEmail;
  try {
    // Start a transaction-like sequence

    // Delete from the first collection
    const deleteBooking = await fetchCollection("bookings").deleteOne({
      bookingId: new ObjectId(bookingId),
      userEmail: userEmail,
    });

    // Check if the first deletion was successful
    if (deleteBooking.deletedCount !== 1) {
      res.status(404).send({ error: "Booking not found" });
      return;
    }

    // Delete from the second collection
    const deleteScreenings = await fetchCollection("screenings").deleteMany({
      bookingId: new ObjectId(bookingId),
    });

    // Check if the second deletion was successful
    if (deleteScreenings.deletedCount < 1) {
      // Handle the case when nothing was deleted in the second collection
    }

    // If both deletions were successful, send a 204 No Content response
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error deleting booking" });
  }
});

export default router;
