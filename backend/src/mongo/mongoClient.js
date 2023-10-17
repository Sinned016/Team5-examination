import { MongoClient } from "mongodb";
import * as env from "dotenv";
env.config();

let db = undefined;
const appDatabaseName = "filmvisarna";

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://sinned:wnIMWE2VVZo0mYTt@team5.b809lmc.mongodb.net/
  `;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName);

  return db;
}
