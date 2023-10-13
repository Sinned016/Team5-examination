import express from "express"
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";

const router = express.Router();

router.get("/movies", async (req, res) => {

    try {
        const movies = await fetchCollection("movies").find().toArray();
        res.send(movies)
    } catch(err) {
        res.status(500)
        res.send(err.clientMessage)
    }
})


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
})

// Updating specific screenings seats
router.put("/update/screening/:id", async (req, res) => {
    const screeningId = new ObjectId(req.params.id);
    console.log(screeningId);
    //const bookedSeats = [ [1, 6], [1, 7] ];

    if(ObjectId.isValid(screeningId)) {

        const screening = await fetchCollection("screenings").updateOne({_id: screeningId}, {$set: {"seats.1.5": 1}});
        res.send(screening);
    }
})



export default router;