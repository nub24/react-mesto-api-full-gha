const cardRouter = require('express').Router();
const { validationCreateCard, validationCardId } = require('../middlewares/validation');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

cardRouter.get('/', getCards);
cardRouter.post('/', validationCreateCard, createCard);
cardRouter.delete('/:_id', validationCardId, deleteCard);
cardRouter.put('/:_id/likes', validationCardId, likeCard);
cardRouter.delete('/:_id/likes', validationCardId, dislikeCard);

module.exports = cardRouter;
