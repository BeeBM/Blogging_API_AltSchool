const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const AuthController = require('../Controllers/authController');
const checkBodyContains = require('../Utils/validation');

const authRouter = express.Router();

authRouter.post('/signup', checkBodyContains('firstname', 'lastname', 'username', 'email', 'password'), AuthController.signup);
authRouter.post('/login', checkBodyContains('email', 'password'), AuthController.login);

module.exports = authRouter;