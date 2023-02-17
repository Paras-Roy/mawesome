const express = require('express');
const app = express();
const port = 5000;

//middleware
const cors = require('cors');
app.use(cors());

//body parser
app.listen(port);

//default route
app.get('/', (req, res) => {
    res.send('API is running...');
})

//import routes
app.use('/weather', require('./routes/weather'));
app.use('/forecast', require('./routes/forecast'));
app.use('/citylist', require('./routes/citylist'));

//export app
module.exports = app;
