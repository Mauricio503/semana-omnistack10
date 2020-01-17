const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://mauricio:mauricio@cluster0-qaada.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// yarn add cors para permitir acesso externo
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3330);