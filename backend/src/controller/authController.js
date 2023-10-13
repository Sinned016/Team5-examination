import bcrypt from "bcrypt";
import { fetchCollection } from "../mongo/mongoClient.js";

async function createUser(email, password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const filter = { email: email };
  const update = { $setOnInsert: { email, password: hashedPassword, role: "member" } };
  const options = { upsert: true };

  return fetchCollection("users").updateOne(filter, update, options);
}
async function register(req, res) {
  const { email, password } = req.body;
  if (email == undefined || password == undefined)
    return res.status(400).send("Missing email or password");

  let result = await createUser(email, password);

  if (result.upsertedCount == 1) {
    return res.status(201).send("Account created successfully!");
  } else {
    return res.status(409).send("Account already exists"); // 409: Conflict
  }
}

export default { register };
