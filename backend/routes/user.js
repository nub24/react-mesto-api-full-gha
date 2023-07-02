const userRouter = require('express').Router();
const { validationGetUserById, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:_id', validationGetUserById, getUserById);
userRouter.patch('/me', validationUpdateUser, updateProfile);
userRouter.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = userRouter;
