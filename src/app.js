const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydatabase');

require('./models/produto');

const produtorRouter = require('./routes/produto-route');
app.use('/produto', produtorRouter);

const regis = require('./service/produto-service')

app.use('/produto', regis)

module.exports = app;