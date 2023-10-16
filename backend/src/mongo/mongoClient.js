import { MongoClient } from "mongodb";
import * as env from "dotenv";
env.config();

let db = undefined;
const appDatabaseName = "chat-project";

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fe22-cluster.bj36kwm.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName);

  return db;
}
