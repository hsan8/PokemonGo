const express = require('express');
const { listAllPokemon, seedPokemonExcel } = require('../controllers/pokemon.controller');

const router = express.Router();
router.get('/listAllPokemon', listAllPokemon);
router.post('/seed', seedPokemonExcel);

module.exports = router;
