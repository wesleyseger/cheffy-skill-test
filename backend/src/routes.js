import express from 'express';

import AuthController from './controllers/AuthController.js';

import { authenticateToken } from './middlewares/authenticateToken.js';

const routes = express.Router()

routes.post('/auth/login', AuthController.login);
routes.post('/auth/signup', AuthController.signUp);
routes.post('/auth/forgetpassword', AuthController.forgetPassword);
routes.post('/auth/resetpassword', AuthController.resetPassword);

routes.get('/test', authenticateToken, (req, res) => {
  res.send('You are authenticated!')
})

export default routes;