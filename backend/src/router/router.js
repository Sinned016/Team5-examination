import express from "express"
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";

const router = express.Router();

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

    if(ObjectId.isValid(movieId)) {

        const movie = await fetchCollection("movies").findOne({_id: new ObjectId(movieId)});

        if(movie == null) {
            res.status(404).send({error: "Could not fetch the document"});
        } else {
            movie.screenings = await fetchCollection("screenings").find({movieId: movie._id}).toArray();
            res.status(200).send(movie);
        }
    } else {
        res.status(404).send({error: "ObjectId is not valid"});
    }
});


// Updating specific screenings seats
router.put("/update/screening/:id", async (req, res) => {
    const screeningId = new ObjectId(req.params.id);
    const bookedSeats = req.body;
    console.log(screeningId);
    
    
    // [4, 5],
    // [4, 6],
    // [4, 7],
    // [4, 8]

    if (ObjectId.isValid(screeningId)) {
        try {
            for (let i = 0; i < bookedSeats.length; i++) {
                const bookedSeatsString = `seats.${bookedSeats[i][0]}.${bookedSeats[i][1]}`;
                await fetchCollection("screenings").updateOne({_id: screeningId}, {$set: {[bookedSeatsString]: 1}});
            }
            res.status(200).send({hello: `You booked ${bookedSeats.length} seats!`});
    
        } catch(err) {
            res.status(500).send(err.clientMessage);
        }

    } else {
        res.status(404).send({error: "ObjectId is not valid"});
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