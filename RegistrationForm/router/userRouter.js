const express = require('express');
const { home, createUser } = require('../controller/userController.js');

const router = express.Router();

router.get('/', home);
router.post('/register', createUser);

// Corrected module.exports statement
module.exports = router;
