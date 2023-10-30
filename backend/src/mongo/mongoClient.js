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

  const url = `mongodb+srv://team5-user:Myz0fpusrD9YfT44@team5.b809lmc.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(url);

  db = client.db(appDatabaseName);

  return db;
}
