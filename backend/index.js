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
    origin: "*", // The origin that is allowed to access the server
    methods: ["GET", "POST"], // Allowed HTTP request types
  },
});

httpServer.listen(port, () => {
  console.log(`backend started on http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);

  socket.on("seat-selected", (seatInfo) => {
    socket.broadcast.emit("seat-selected", seatInfo);
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
