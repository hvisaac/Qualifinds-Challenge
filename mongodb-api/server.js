const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Querys = require('./api/querys');

const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/querys', Querys);

mongoose.connect(
    "mongodb://localhost:27017/Qualitifinds-Challenge",
    { useNewUrlParser: true },
    (err, res) => {
        err && console.log("error: conect database failed");

        app.get('/', (req, res) => {

            res.render('index')

        })

        app.listen(4000, () => {
            console.log("server conect to port http://localhost:4000");
        });
    }
);
