import bcrypt from "bcrypt";
import { fetchCollection } from "../mongo/mongoClient.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "iwillnottellyoufsfsfsfssfwrwrjwrojjhfsjfhsfj";

// create a new user with email, hashed password and role if the email is not existing.
async function createUser(email, password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const filter = { email: email };
  const update = { $setOnInsert: { email, password: hashedPassword, role: "member" } };
  const options = { upsert: true };

  return fetchCollection("users").updateOne(filter, update, options);
}

// handle post request and validate the input
async function register(req, res) {
  const { email, password } = req.body;
  if (email == undefined || password == undefined)
    return res.status(400).send("Missing email or password"); // 400: bad request

  let result = await createUser(email, password);

  if (result.upsertedCount == 1) {
    return res.status(201).send("Account created successfully!"); // 201: created
  } else {
    return res.status(409).send("Account already exists"); // 409: conflict
  }
}

// Handle post request for logging in
// Authenticate when user login
async function authenticate(email, password) {
  const result = await fetchCollection("users").findOne({ email });
  if (result == undefined) return false;
  const isMatch = await bcrypt.compare(password, result.password);
  return isMatch;
}

async function login(req, res) {
  const { email, password } = req.body;
  if (email == undefined || password == undefined) return res.sendStatus(400);

  const isMatch = await authenticate(email, password);

  if (isMatch) {
    const accessToken = jwt.sign({ email }, JWT_SECRET);
    return res.status(200).send({ accessToken });
  } else {
    return res.status(400).send("Bad credentials");
  }
}
export default { register, login };
