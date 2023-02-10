const express = require('express');
const app = express();
const port = 5000;

//middleware
const cors = require('cors');
app.use(cors());

app.listen(port);

//default route
app.get('/', (req, res) => {
    res.send('API is running...');
})

//import routes
app.use('/weather', require('./routes/weather'));

//export app
module.exports = app;
