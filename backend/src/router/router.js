import express from "express"
import { fetchCollection } from "../mongo/mongoClient.js";
fetchCollection

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


export default router;