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

        const rateSchema = {
            currency: String,
            AUD: String,
            CAD: String,
            CHF: String,
            GBP: String,
            JPY: String,
            USD: String,
            NZD: String,
            EUR: String
        }

        const Rate = mongoose.model('Rate', rateSchema);

        app.get('/', (req, res) => {
            Rate.find({}, function(err, rates) {
                res.render('index', {
                    ratesList: rates,
                    cotize_amount: 0,                          
                })
            })
        })

        app.listen(4000, () => {
            console.log("server conect to port http://localhost:4000");
        });
    }
);
