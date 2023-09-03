const express = require('express');
const router = express.Router();
const { createUser, updateUserLocation, getUserWeatherData } = require('../controllers/userController');
const User = require('../models/userModel');

router.post('/users', createUser);
router.put('/users/:id/location', updateUserLocation);
router.get('/users/:id/weather/:date', getUserWeatherData);

module.exports = router;
