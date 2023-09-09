const express = require('express');

const router = express.Router();

// all routes that belong to version v1.0.0
router.use('/pokemon', require('../../../v1.0.0/pokemon/routes/pokemon.route'));

module.exports = router;
