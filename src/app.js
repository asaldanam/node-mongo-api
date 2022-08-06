import express from 'express'

import { changePasswordController } from './controllers/change-password.js';
import { loginController } from './controllers/login.js';
import { registerController } from './controllers/register.js';

const app = express();
const port = 8081;

app.listen(port, () => {
  console.log(`Aplicación correctamente levantada en el puerto ${port} 🥳 🥳 🥳 🥳 `)
})

app.use(express.json())


// routes
app.get('/', (req, res) => { res.send({ msg: 'Hello World' }) })
app.post('/login', loginController)
app.post('/register', registerController)
app.post('/change-password', changePasswordController)