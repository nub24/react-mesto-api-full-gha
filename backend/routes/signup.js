const signupRouter = require('express').Router();
const { validationCreateUser } = require('../middlewares/validation');
const { createUser } = require('../controllers/users');

signupRouter.post('/signup', validationCreateUser, createUser);

module.exports = signupRouter;
