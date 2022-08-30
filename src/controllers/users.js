import mongodb from "../clients/mongodb.js";

export async function getUsersController(req, res) {
  
  // Inicializa la conexión con mongodb
  const db = await mongodb();
  // saca los datos de la query, esta sería similar a un SELECT * FROM users 
  // documentación SELECT https://github.com/mongodb/node-mongodb-native#find-all-documents
  const data = await db.collection('users').find({}).toArray(); 

  res.send({ data });

}