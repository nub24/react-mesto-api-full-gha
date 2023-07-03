const Card = require('../models/card');
const NotFoundError = require('../errors/notFounrError');
const ValidationError = require('../errors/validationError');
const CastError = require('../errors/castError');
const ForbiddenError = require('../errors/forbiddenError');

const { OK_CODE, CREATED_CODE } = require('../utils/constants');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      card
        .populate('owner')
        .then(() => res.status(CREATED_CODE).send(card));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (_, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res
        .status(OK_CODE)
        .send(cards);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена!');
      }
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      Card.findByIdAndRemove(cardId).then(() => res.status(OK_CODE).send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Некорректный ID!'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена!');
      }
      res
        .status(OK_CODE)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена!');
      }
      return res
        .status(OK_CODE)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};
