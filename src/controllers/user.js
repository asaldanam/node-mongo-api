import mongodb from "../clients/mongodb.js";

export async function deleteUsersController(req, res) {
  const params = req.params;

  // DELETE FROM users WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').deleteMany({id: params.id});

  // res.send({ result });
  res.send(`Usuario con id ${params.id} borrado`);

}