const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../errors/notFounrError');
const CastError = require('../errors/castError');
const ValidationError = require('../errors/validationError');
const ConflictError = require('../errors/conflictError');

const { OK_CODE, CREATED_CODE } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      email, password: hash, name, about, avatar,
    }))
    .then((userData) => {
      const { _id } = userData;
      res
        .status(CREATED_CODE)
        .send({
          data: {
            _id, email, name, about, avatar,
          },
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при регистрации'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (_, res, next) => {
  user.find({})
    .then((userData) => {
      res
        .status(OK_CODE)
        .send({ data: userData });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { _id } = req.params;
  user.findById(_id)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь не найден!');
      }
      return res
        .status(OK_CODE)
        .send({ data: userData });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Некорректный ID!'));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  user.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь не найден!');
      }
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные!!'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  user.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь не найден!');
      }
      res.send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные!!'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((userData) => {
      if (userData) {
        const token = jwt.sign({ _id: userData._id }, 'very-secret-key', { expiresIn: '7d' });
        res.send({ token });
      }
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  user.findById(userId)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError('Пользователь не найден!');
      }
      res.send(userData);
    })
    .catch(next);
};
