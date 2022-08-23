import mongodb from "../clients/mongodb.js";

export async function registerController(req, res) {
  const { email, password, ...rest } = req.body;

  if (!email) {
    res.status(400).send({ error: 'Email no enviado' });
    return;
  }

  if (!password) {
    res.status(400).send({ error: 'Contraseña no enviada' });
    return;
  }

  const encryptedPassword = btoa(password);

  const db = await mongodb();

  const user = {
    email,
    encryptedPassword,
    ...rest
  };

  // INSERT INTO users
  // VALUES ...
  const result = await db.collection('users').insertOne(user);

  res.send({ result });
}