const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 

const app = express();
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://mauricio:doremifa109@cluster0-1ywuz.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(routes);

app.listen(8080);
