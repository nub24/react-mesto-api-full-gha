const signinRouter = require('express').Router();
const { validationAuth } = require('../middlewares/validation');
const { login } = require('../controllers/users');

signinRouter.post('/signin', validationAuth, login);

module.exports = signinRouter;
