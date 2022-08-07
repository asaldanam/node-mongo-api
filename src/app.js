import cors from 'cors';
import express from 'express';
import { loginController } from './controllers/login.js';
import { registerController } from './controllers/register.js';
import { getUsersController } from './controllers/users.js';
import { authGuard } from './handlers/authGuard.js';
import { logger } from './handlers/logger.js';

const app = express();
const port = 8081;

app.listen(port, () => console.log(`Running in http://localhost:${port}`))

app.use(express.json())
app.use(cors())

// routes
app.get('/', logger, (req, res) => { res.send({ message: 'node-mongo-api works!' }) })
app.post('/login', logger, loginController)
app.post('/register', logger, registerController)
app.get('/users', logger, authGuard, getUsersController)