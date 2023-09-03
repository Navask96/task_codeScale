const User = require('../models/userModel');
const { getWeatherData } = require('../services/weatherService');
const { sendWeatherReport } = require('../utils/emailService');

async function createUser(req, res) {
  try {
    const { email, location } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const weatherData = await getWeatherData(location);
    
    const newUser = new User({
      email,
      location,
      weatherData: [
        {
          date: new Date(),
          temperature: weatherData.main.temp,
          humidity: weatherData.main.humidity,
        },
      ],
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update user location
async function updateUserLocation(req, res) {
  try {
    const { id } = req.params;
    const { location } = req.body;

    // Find the user by ID and update their location
    const user = await User.findByIdAndUpdate(id, { location }, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get user weather data for a given day
async function getUserWeatherData(req, res) {
  try {
    const { id, date } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find weather data for the given date
    const weatherEntry = user.weatherData.find((entry) => entry.date.toDateString() === new Date(date).toDateString());

    if (!weatherEntry) {
      return res.status(404).json({ error: 'Weather data not found for the specified date' });
    }

    res.json(weatherEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createUser, updateUserLocation, getUserWeatherData };
