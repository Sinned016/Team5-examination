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

// POST booking information
router.post("/book/screening", (req, res) => {
    const bookingInformation = req.body;

    if (bookingInformation.email == undefined || 
        bookingInformation.bookingNumber == undefined || 
        bookingInformation.seats == undefined || 
        bookingInformation.price == undefined || 
        bookingInformation.screening_id == undefined)
        
    return res.status(400).send("Missing information"); // 400: bad request

    let result = fetchCollection("bookings").insertOne({
        email: bookingInformation.email,
        bookingNumber: bookingInformation.bookingNumber,
        seats: bookingInformation.bookedSeats,
        price: bookingInformation.price,
        screening_id: bookingInformation.screening_id
    })
 })
 
export default router;