import express from "express";
import router from "./src/router/router.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 5003;

const app = express();

// Create a http server
const httpServer = createServer(app);

// Create a socket.io server instance on httpServer
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allowing any origin to connect to this socket.io server
  },
});

httpServer.listen(port, () => {
  console.log(`backend started on http://localhost:${port}`);
});

// Listening for new connections from clients
// Each connection presented by the 'socket' object which has a unique 'id'
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  // Event listeners for individual sockets, we have different events to listen on (adjustable to our case)
  // The server takes "seatInfo" and sends the same event to all other connected clients
  socket.on("seat-selected", (seatInfo) => {
    socket.broadcast.emit("seat-selected", seatInfo); // 'broadcast.emit' method sends the event and seatInfo to every client except for the sender
  });

  socket.on("seat-unselected", (seatInfo) => {
    socket.broadcast.emit("seat-unselected", seatInfo);
  });

  socket.on("seat-booked", (seatInfo) => {
    socket.broadcast.emit("seat-booked", seatInfo);
  });

  socket.on("seat-cancelled ", (seatInfo) => {
    socket.broadcast.emit("seat-cancelled", seatInfo);
  });

  // Handling disconnections
  // When a client disconnects, the server logs a message which user/socket's unique id has disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
  });
});

app.use(express.json({ limit: "1MB" }));

// test route
app.get("/hello", (req, res) => {
  res.json({ message: "hello world!" });
});

// another test route
app.get("/health", (req, res) => {
  res.send({ state: "up", message: "Server is healthy" });
});

app.use("/api", router);

// serve the dist folder (the production code for our frontend)
// that you generate by writing "npm run build"
const distFolder = join(__dirname, "../", "dist");
app.use(express.static(distFolder));
