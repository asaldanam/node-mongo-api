import mongodb from "../clients/mongodb.js";

export async function getUsersController(req, res) {
  // SELECT * FROM users 
  const db = await mongodb();
  const data = await db.collection('users').find({}).toArray();

  res.send({
    data
  });

}