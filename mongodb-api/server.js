const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Querys = require('./api/querys');
const Currencys = require('./api/currencys');

const app = express();
app.use (express.static(__dirname + '/css'));
const ejs = require('ejs');
const currency = require('./models/currency');
const router = require('./api/querys');
const { db } = require('./models/currency');

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

        const querySchema = {
            name: String,
            number: String,
            currency: String,
            quote: String,
            currency_amount: String,
            quote_amount: String,
            available_money: String,
            fee_cost: String
        }

        const Rate = mongoose.model('Rate', rateSchema);
        const Currency = mongoose.model('Currency', currencySchema);
        const Query = mongoose.model('Query', querySchema);
        const Available_Currency = 0;

        app.get('/calculate', (req, res) => {

            Rate.find({}, function (err, rates) {
                res.render('calculate', {
                    ratesList: rates,
                    cotize_amount: 0,
                })
            })

        })

        app.post('/exchange', async function (req, res) {
            Currency.find({}, function (err, currencies) {
                res.render('exchange', {
                    currenciesList: currencies,
                    currency: req.body.currency,
                    quote: req.body.quote,
                    currency_amount: req.body.currency_amount,
                    quote_amount: req.body.quote_amount,
                    fee_cost: req.body.fee_cost
                })
            })
        })

        app.post('/add',
            async function (req, res) {
                try {
                    let newQuery = new Query({
                        name: req.body.name,
                        number: req.body.number,
                        currency: req.body.currency,
                        quote: req.body.quote,
                        currency_amount: req.body.currency_amount,
                        quote_amount: req.body.quote_amount,
                        available_money: req.body.available_money,
                        Available_Currency: req.body.available_currency_money,
                        fee_cost: req.body.fee_cost
                    })

                    newQuery.save((err, usr) => {
                        err && res.status(500).send(err.message);

                        res.status(200).json(usr);
                    })

                
                    const resultsum = await Currency.findOneAndUpdate(
                        {
                            currency: req.body.currency
                        },
                        {
                            available_money: parseFloat(req.body.currency_amount) + parseFloat(req.body.available_currency_money)
                        },
                        {
                            upsert: true,
                            new: true
                        }
                    )

                     
                    const resultres = await Currency.findOneAndUpdate(
                        {
                            currency: req.body.quote
                        },
                        {
                            available_money: parseFloat(req.body.available_money) - parseFloat(req.body.quote_amount)
                        },
                        {
                            upsert: true,
                            new: true
                        }
                    )

                }
                catch (err) {
                    console.log(err.message);
                }
            }
        )
        app.listen(4000, () => {
            console.log("server conect to port http://localhost:4000");
        });
    })