import express from "express";
import router from "./src/router/router.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouter from "./src/router/authRouter.js";
import * as env from "dotenv";
env.config();

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

let clients = [];
// Listening for new connections from clients
// Each connection presented by the 'socket' object which has a unique 'id'
io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  clients.push({socket});

  socket.on("new-booking", (screeningId) => {
    clients
      .filter(client => client.screeningId === screeningId)
      .forEach(client => {
        client.socket.emit("seat-update", screeningId);
      });
  });

  socket.on("view-screening", (screeningId) => {
    let client = clients.find(client => client.socket.id === socket.id);
    client.screeningId = screeningId;
    console.log(clients);
  });

  // Handling disconnections
  // When a client disconnects, the server logs a message which user/socket's unique id has disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected: " + socket.id);
    clients = clients.filter(client => client.socket.id !== socket.id)
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
app.use("/api", authRouter);

// serve the dist folder (the production code for our frontend)
// that you generate by writing "npm run build"
const distFolder = join(__dirname, "../", "dist");
app.use(express.static(distFolder));
