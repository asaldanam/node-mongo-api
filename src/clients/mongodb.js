import { MongoClient } from 'mongodb';

// Connection URL
const url = 'mongodb://root:root@localhost:27017';
const client = new MongoClient(url);

const dbName = 'db';

export default async function mongodb() {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  
  return db;
}