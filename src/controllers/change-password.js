import mongodb from "../clients/mongodb.js";

export async function changePasswordController(req, res) {
  // Lógica de seguridad
  const authorization = req.header('Authorization');
  const token = authorization.replace('Basic ', '');
  const credentials = atob(token);
  const [email, tokenDate] = credentials.split('/');

  const aDay = 1000 * 60 * 60 * 24;
  const expirationDate = aDay;

  const tokenDateAsTimestamp = new Date(tokenDate).getTime();
  const now = new Date().getTime();
  const timeFromTokenGeneration = now - tokenDateAsTimestamp;
  const isExpired = timeFromTokenGeneration > expirationDate;

  if (isExpired) {
    res.status(401).send({ error: 'token caducado' });
    return;
  }

  // Cambiar contraseña


  res.send({
    authorization,
    token,
    credentials,
    email,
    tokenDate,
    tokenDateAsTimestamp,
    now,
    timeFromTokenGeneration,
    expirationDate,
    isExpired
  })
}