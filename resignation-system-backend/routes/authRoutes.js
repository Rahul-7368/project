

const express = require('express');
const {register, login} = require('../controllers/authController');
require('dotenv').config();

const router = express.Router();

router.post('/register', register); 
router.post('/login', login );

module.exports = router;