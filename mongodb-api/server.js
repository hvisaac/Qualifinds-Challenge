const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Querys = require('./api/querys');
const Currencys = require('./api/currencys');

const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/querys', Querys);
app.use('/api/currencys', Currencys);

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

        const currencySchema = {
            currency: String,
            available_money: String
        }

        const Rate = mongoose.model('Rate', rateSchema);
        const Currency = mongoose.model('Currency', currencySchema);

        app.get('/calculate', (req, res) => {

            Rate.find({}, function (err, rates) {
                res.render('calculate', {
                    ratesList: rates,
                    cotize_amount: 0,
                })
            })

        })

        app.post('/exchange', function (req, res) {
            Currency.find({currency: req.body.cotize}, function (err, currencies) {           
                res.render('exchange', {
                    currenciesList: currencies,
                    currency: req.body.currency,
                    cotize: req.body.cotize,
                    currency_amount: req.body.currency_amount,
                    cotize_amount: req.body.cotize_amount
                })
            })
        })

        app.listen(4000, () => {
            console.log("server conect to port http://localhost:4000");
        });
    }
);
