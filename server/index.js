const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port);

//default route
app.get('/', (req, res) => {
    res.send('API is running...');
})

//import routes
app.use('/weather', require('./routes/weather'));

//export app
module.exports = app;
