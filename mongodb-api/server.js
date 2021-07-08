const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Currencys = require('./api/currencys');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/api/currencys', Currencys);

mongoose.connect(
    "mongodb://localhost:27017/Qualitifinds-Challenge",
    { useNewUrlParser: true },
    (err, res) => {
        err && console.log("error: conect database failed");
        app.listen(4000, () => {
            console.log("server conect to port http://localhost:4000");
        }); 
    }
);