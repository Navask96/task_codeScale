const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  location: {
    type: String,
    required: true,
  },
  weatherData: [
    {
      date: {
        type: Date,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
