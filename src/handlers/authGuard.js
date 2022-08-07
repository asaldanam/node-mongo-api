export function authGuard(req, res, next) {
  // Lógica de seguridad
  try {
    const authorization = req.header('Authorization');

    if (!authorization) throw 'Falta cabecera Authorization con el token';

    const token = authorization.replace('Basic ', '');
    const credentials = atob(token);
    const [email, tokenDate] = credentials.split('/');

    if (!tokenDate || !email) throw 'Token no válido';

    const aDay = 1000 * 60 * 60 * 24;
    const expirationDate = aDay;

    const tokenDateAsTimestamp = new Date(tokenDate).getTime();
    const now = new Date().getTime();
    const timeFromTokenGeneration = now - tokenDateAsTimestamp;
    const isExpired = timeFromTokenGeneration > expirationDate;

    if (isExpired) throw 'Token caducado';
    next();
  } catch (error) {
    // console.error(error)
    res.status(401).send({ error });
    return;
  }
};