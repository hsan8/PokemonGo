const { check, validationResult } = require('express-validator');
const { objectKeys } = require('../utilities/header.utility');

exports.validatePokemonPayload = [
  check('pokemonPayload').notEmpty().withMessage('pokemonPayload is required'),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(421).send({ status: 'error', errors: errors.array() });
      } else if (Object.keys(req.body.pokemonPayload).length === 0) {
        res
          .status(421)
          .send({ status: 'error', errors: ['pokemonPayload cannot be empty'] });
      }
      next();
    } catch (error) {
      res.status(421).send({ status: 'error', errors: error });
    }
  }
];

exports.validateIsValidID = [
  check('pokemonId').notEmpty().withMessage('pokemonId is required'),
  check('pokemonId')
    .exists()
    .isMongoId()
    .withMessage('pokemonId is not a valid mongo object id'),
  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(421).send({ status: 'error', errors: errors.array() });
      }
      next();
    } catch (error) {
      res.status(421).send({ status: 'error', errors: error });
    }
  }
];

exports.validateListingQuery = [
  check('searchBy')
    .custom((value, { req }) => {
      if (typeof req.query.searchBy === 'undefined') {
        return true; // Skip validation if 'searchBy' is not in the request
      }
      return objectKeys.includes(value);
    })
    .withMessage(
      'Invalid searchBy field please check the spelling and respect the casesenstive'
    ),

  check('sortBy')
    .custom((value, { req }) => {
      if (typeof req.query.sortBy === 'undefined') {
        return true; // Skip validation if 'searchBy' is not in the request
      }
      return objectKeys.includes(value);
    })
    .withMessage(
      'Invalid searchBy field please check the spelling and respect the casesenstive'
    ),

  (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(421).send({ status: 'error', errors: errors.array() });
      } else {
        next();
      }
    } catch (error) {
      res.status(421).send({ status: 'error', errors: error });
    }
  }
];
