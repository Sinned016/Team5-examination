//import * as dotenv from "dotenv"
//dotenv.config()
import { MongoClient } from 'mongodb';

let db = undefined;


export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const url = `mongodb+srv://sinned:wnIMWE2VVZo0mYTt@team5.b809lmc.mongodb.net/`;
  const client = new MongoClient(url);

  db = client.db("filmvisarna"); // Samling av collections (skapas dynamisk, har ej skapats explicit i atlas)

  return db;
}