import mongodb from "../clients/mongodb.js";

export async function loginController(req, res) {
  const body = req.body;

  // Valida que se recibe el email desde el body, si no manda un error 400 con un mensaje
  if (!body.email) {
    res.status(400).send({ error: 'Email no enviado' });
    return;
  }

  // Idem para el password
  if (!body.password) {
    res.status(400).send({ error: 'Contraseña no enviada' });
    return;
  }

  // BASE DE DATOS
  const db = await mongodb(); // Abre conexión a la base de datos
  const users = await db.collection('users').find({ email: body.email }).toArray(); // SELECT * FROM users WHERE email=`${email}`
  const [user] = users; // Obtiene el primer usuario 
  
  // btoa encrypta (DE FORMA NO SEGURA!!!) a base64
  const bodyEncryptedPassword = btoa(body.password);

  const passwordNotMatch = bodyEncryptedPassword !== user?.encryptedPassword;

  // Si no ha encontrado un usuario por el email del body o la contraseña introducida no coincide con la de la db
  if (!user || passwordNotMatch) {
    res.status(400).send({ error: 'Inicio de sesión no válido' });
    return;
  }

  const token = btoa(`${user.email}/${new Date().toISOString()}`);

  res.send({ email: user.email, token });
}