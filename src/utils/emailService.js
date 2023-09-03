const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'bandaranavanjana154@gmail.com', 
    pass: 'Nava1234@', 
  },
});

async function sendWeatherReport(email, weatherData) {
  try {
    const mailOptions = {
      from: 'bandaranavanjana154@gmail.com',
      to: email,
      subject: 'Hourly Weather Report',
      html: `<p>Here is your hourly weather report:</p>
             <p>Temperature: ${weatherData.temperature}°C</p>
             <p>Humidity: ${weatherData.humidity}%</p>
             <!-- Add other weather data fields as needed -->`,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Weather report sent to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}: ${error.message}`);
  }
}

module.exports = { sendWeatherReport };
