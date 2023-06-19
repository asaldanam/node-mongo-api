import cors from 'cors';
import express from 'express';
import { loginController } from './controllers/login.js';
import { registerController } from './controllers/register.js';
import { getUsersController } from './controllers/users.js';
import { deleteUserController } from './controllers/user.js';
import { updateUserController } from './controllers/user.js';
import { getUserController } from './controllers/user.js';
import { authGuard } from './handlers/authGuard.js';
import { logger } from './handlers/logger.js';

const app = express(); // Se instancia la aplicación de express
const port = 8081; // Definimos un puerto

// Ponemos a escuchar la app de express en el puerto definido:
app.listen(port, () => console.log(`Running in http://localhost:${port}`));

app.use(express.json()); // Esto sirve para que express mande la cabecera de respuesta "Content-Type: application/json"
app.use(cors()); // Esto sirve para que no de problemas de CORS

// routes
app.get('/', logger, (req, res) => { res.send({ message: 'node-mongo-api works!' }); });
app.post('/login', logger, loginController);
app.post('/register', logger, registerController);

app.get('/users', logger, authGuard, getUsersController);
app.delete('/user/:id', logger, authGuard, deleteUserController);
app.put('/user/:id', logger, authGuard, updateUserController);
app.get('/user/:id', logger, authGuard, getUserController);





app.get('/channels', logger, (req, res) => {
  // Para sacar los query params que se envian desde el cliente:
  // Los query params son opcionales
  // Ejemplo: limit=4&offset=2 en la ruta http://localhost:8081/channels?limit=4&offset=2 (es decir, despues de "?")
  const query = req.query;

  // data de ejemplo, en un caso real aquí habría una query SQL o noSQL
  const mock = [1, 2, 3, 4, 5, 6, 7];

  const start = query.offset || 0;
  const end = query.limit || 5;

  const channels = mock.slice(start, end);

  res.send({ channels });
});

app.get('/channel/:id', logger, (req, res) => {
  // Para sacar los parámetros de ruta que se hayan definido.
  // Los route params son obligatorios
  // Ejemplo: para la ruta http://localhost:8081/channel/1, params.id tomará el valor de "1"
  const params = req.params; // capturamos los parámetros de ruta
  const id = parseInt(params.id); // parseamos a number el id que nos llega por params

  // Validamos que el id es un número
  if (isNaN(id)) {
    res.status(400).send(`El id ${params.id} no es un número`);
    return;
  }

  res.send(`El id es ${params.id}`);
});