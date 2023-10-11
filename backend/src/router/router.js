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

// GladiatorId = 65157cedcc65c28c5afd3ef9
router.get("/movie/:id", async (req, res) => {
    const movieId = req.params.id

    if(ObjectId.isValid(movieId)) {

        const movie = await fetchCollection("movies").findOne({_id: new ObjectId(movieId)})

        if(movie == null) {
            res.status(404).send({error: "Could not fetch the document"})
        } else {
            res.status(200).send(movie)
        }
    } else {
        res.status(404).send({error: "ObjectId is not valid"})
    }
})

export default router;