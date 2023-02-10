const express = require('express');
const app = express();
const port = 3000;

app.listen(port);

//default route
app.get('/', (req, res) => {
    res.send('API is running...');
})

//import routes
app.use('/weather', require('./routes/weather'));

//export app
module.exports = app;
