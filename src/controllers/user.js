import mongodb from "../clients/mongodb.js";

export async function deleteUsersController(req, res) {
  const body = req.body;

  // DELETE FROM users WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').deleteOne({id: body.id}).toArray();

  res.send({ result });

}