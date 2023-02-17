const express = require('express');
const router = express.Router();

require('dotenv').config();

const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?minPopulation=100000&namePrefix=mum';

const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0ce3653f51msh2ba284a00f037adp18f2abjsnc6ddb76feae4',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

const getCityList = async (searchTerm) => {
    
    try {
        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?minPopulation=100000&namePrefix=${searchTerm}`, options);
        if (!response.ok) {
            throw new Error(`Failed to fetch city information with status code ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

router.get('/:searchTerm', async (req, res) => { 
    try {
        const cityListObject = await getCityList(req.params.searchTerm);
        const cityList = cityListObject.data.map((city) => {
            return {
                name: city.name,
                countryCode: city.countryCode,
            }
        });
        res.json(cityList);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch city information');
    }
});

module.exports = router;