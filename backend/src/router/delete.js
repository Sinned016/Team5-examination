import express from "express";
import { ObjectId } from "mongodb";
import { fetchCollection } from "../mongo/mongoClient.js";

const router = express.Router();

router.delete("/bookings/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;
  const userEmail = req.body.userEmail; // Assuming you send the user's email in the request body

  if (!ObjectId.isValid(bookingId)) {
    res.status(400).send({ error: "Invalid bookingId" });
    return;
  }

  try {
    const result = await fetchCollection("bookings").deleteOne({
      _id: new ObjectId(bookingId),
      userEmail: userEmail,
    });

    if (result.deletedCount === 1) {
      res.status(204).send(); // Return a 204 No Content status on successful deletion
    } else {
      res.status(404).send({ error: "Booking not found" });
    }
  } catch (err) {
    res.status(500).send({ error: "Error deleting booking" });
  }
});

export default router;
// export default { makeChannel, removeChannel, postMessage };

// 15.1 DELETE från bookingscollection.
// Uppdatera visningen som bokningen var
// kopplad till för att uppdatera stolarna från
// bokade till avbokade.

// Ta bort bokningsid från rätt mailadress
