import { ObjectId } from "mongodb";
import mongodb from "../clients/mongodb.js";

export async function deleteUserController(req, res) {
  // Al filtrar por el campo "_id" (porque id no existe) no se puede pasar como string
  // Si no como una instacia de ObjectId (importado desde la librería)
  // https://www.mongodb.com/docs/manual/reference/method/ObjectId/
  const _id = new ObjectId(req.params.id);
  const params = req.params;

  // DELETE FROM users WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').deleteMany({ _id});

  // res.send({ result });
  res.send(`Usuario con id ${params.id} borrado`);
}

export async function updateUserController(req, res) {
  const _id = new ObjectId(req.params.id);
  const body = req.body;

  // UPDATE users SET name='nombre', surname='surname'
  // WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').updateOne({ _id }, { $set: body });

  res.send(result);
}
