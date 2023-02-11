const express = require('express');
const router = express.Router();

require('dotenv').config();

const getWeather = async (city) => {
    try {
        const units = 'metric';
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.API_KEY}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch weather information for ${city} with status code ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

router.get('/:city', async (req, res) => { 
    try {
        const weatherData = await getWeather(req.params.city);
        res.json(weatherData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch weather information');
    }
});

module.exports = router;