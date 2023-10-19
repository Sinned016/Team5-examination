import bcrypt from "bcrypt";
import { fetchCollection } from "../mongo/mongoClient.js";
import jwtUtil from "../util/jwtUtil.js";
import e from "express";

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
  if (!email || typeof email !== "string") {
    return res.status(400).send("Invalid email");
  }

  if (!password || typeof password !== "string") {
    return res.status(400).send("Invalid password");
  }

  if (password.length < 6) {
    return res.status(400).send("Password too short. Should be at least 6 characters");
  }

  if (!/[A-Z]/.test(password) || !/\d/.test(password) || !/[a-z]/.test(password)) {
    return res
      .status(400)
      .send("The password must contain a capital letter, a lowercase letter and a digit!");
  }

  // Check if the password contains spaces
  if (/\s/.test(password)) {
    return res.status(400).send("Password should not contain spaces");
  }

  try {
    const result = await createUser(email, password);
    if (result.upsertedCount == 1) {
      return res.status(201).send("Account created successfully!"); // 201: created
    } else {
      return res.status(409).send("Account already exists"); // 409: conflict
    }
  } catch (error) {
    return res.status(500).send("Server error");
  }
}

// Authenticate when user login
async function authenticate(email, password) {
  const result = await fetchCollection("users").findOne({ email });
  if (result == undefined) return false;
  const isMatch = await bcrypt.compare(password, result.password);
  return isMatch;
}

async function login(req, res) {
  const { email, password } = req.body;

  if (email == undefined || password == undefined) {
    res.status(400).send("Bad credentials");
  } else {
    const isMatch = await authenticate(email, password);
    if (isMatch) {
      const user = await fetchCollection("users").findOne({ email });
      const role = user.role;
      const accessToken = jwtUtil.generate(email, role);
      return res.status(200).send({ message: "Successfully Logged in", accessToken });
    } else {
      return res.status(400).send("Bad credentials. Invalid email/password");
    }
  }
}
export default { register, login };
