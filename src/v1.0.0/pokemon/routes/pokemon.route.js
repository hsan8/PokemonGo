const express = require('express');
const {
  listAllPokemon,
  seedPokemonExcel,
  createPokemon,
  getPokemonByObjectID,
  updatePokemon,
  deletePokemonByObjectID
} = require('../controllers/pokemon.controller');
const {
  validatePokemonPayload,
  validateIsValidID,
  validateListingQuery
} = require('../middleware/pokemon.middleware');

const router = express.Router();

router.post('/seed', seedPokemonExcel);
router.get('/listAllPokemon', validateListingQuery, listAllPokemon);
router.post('/create', validatePokemonPayload, createPokemon);
router.get('/getByID/:pokemonId', validateIsValidID, getPokemonByObjectID);
router.put(
  '/update/:pokemonId',
  validateIsValidID,
  validatePokemonPayload,
  updatePokemon
);
router.delete('/deleteByID/:pokemonId', validateIsValidID, deletePokemonByObjectID);

module.exports = router;
