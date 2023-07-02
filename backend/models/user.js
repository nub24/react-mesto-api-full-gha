const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неверный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    validate: {
      validator(str) {
        return str.length >= 2 && str.length <= 30;
      },
      message: 'Имя пользователя должно содержать от 2 до 30 символов',
    },
  },
  about: {
    type: String,
    default: 'Исследователь',
    validate: {
      validator(str) {
        return str.length >= 2 && str.length <= 30;
      },
      message: 'Информация о пользователе должна содержать от 2 до 30 символов',
    },
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => isUrl(url),
      message: 'Неверный формат ссылки',
    },
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
