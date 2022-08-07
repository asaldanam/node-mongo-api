import express from 'express'

import { changePasswordController } from './controllers/change-password.js';
import { loginController } from './controllers/login.js';
import { registerController } from './controllers/register.js';
import cors from 'cors'

const app = express();
const port = 8081;

app.listen(port, () => console.log(`Running in ${port}`))

app.use(express.json())
app.use(cors())

// routes
app.get('/', (req, res) => { res.send({ message: 'node-mongo-api works!' }) })
app.post('/login', loginController)
app.post('/register', registerController)
app.post('/change-password', changePasswordController)