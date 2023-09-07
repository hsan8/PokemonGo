const express = require('express');
const { listAllPokemon } = require('../controllers/pokemon.controller');

const router = express.Router();
router.get('/listAllPokemon', listAllPokemon);

module.exports = router;
