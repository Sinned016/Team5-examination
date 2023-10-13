import bcrypt from "bcrypt";
import { fetchCollection } from "../mongo/mongoClient.js";
// create/insert a new user document in MongoDB, including email, hashed password and role.
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

export default { register };
