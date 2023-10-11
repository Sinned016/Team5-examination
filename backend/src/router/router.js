import express from "express"
import { fetchCollection } from "../mongo/mongoClient.js";
fetchCollection

const router = express.Router();

router.get("/movies", async (req, res) => {

    const movies = await fetchCollection("movies").find().toArray();
    res.send(movies)
})


export default router;