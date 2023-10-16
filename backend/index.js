import express from "express";
import router from "./src/router/router.js";
import authRouter from "./src/router/authRouter.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as env from "dotenv";
env.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = 5003;

const app = express();

app.use(express.json({ limit: "1MB" }));

app.listen(port, () => {
  console.log(`backend started on http://localhost:${port}`);
});

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
