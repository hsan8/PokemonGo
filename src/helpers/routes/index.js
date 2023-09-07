const express = require('express');

const router = express.Router();

// from here we handle versions
router.use('/v1.0.0', require('./v1.0.0/routes'));

module.exports = router;
