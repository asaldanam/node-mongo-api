import { ObjectId } from "mongodb";
import mongodb from "../clients/mongodb.js";

export async function deleteUserController(req, res) {
  const params = req.params;

  // DELETE FROM users WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').deleteMany({ id: params.id });

  // res.send({ result });
  res.send(`Usuario con id ${params.id} borrado`);
}

export async function updateUserController(req, res) {
  // Se ve que mongodb espera que cuando le filtras por el campo "_id" (porque el id no existe)
  // Debes pasárselo no como string, si no como una instacia de ObjectId (importado desde la librería)
  // https://www.mongodb.com/docs/manual/reference/method/ObjectId/
  const _id = new ObjectId(req.params.id);
  const body = req.body;

  // // WHERE id=`${id}`
  const db = await mongodb();
  const result = await db.collection('users').updateOne({ _id }, { $set: body });

  res.send(result);
}
