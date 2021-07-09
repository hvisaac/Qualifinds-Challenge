const mongodb = require('mongoose');
const currency = require('./currencys');

const findAllCurrencys = (req, res) => {
    currency.find((err, currencys) => {
        err && res.send(500).send(err.message);

        res.status(200).json(currencys);
    })   
}

const findByID = (req,res) => {
    currency.findById(req.params.id, (err, query) => {
        err && res.status(500).send(err.message);

        res.status(200).json(query);
    })
}

const addcurrency = (req, res) => {
    let query = new currency({
        currency: req.body.currency,
        available_money: req.body.available_money
    })

    query.save((err, usr) => {
        err && res.status(500).send(err.message);
        
        res.status(200).json(usr);
    }) 
};

module.exports = { findAllCurrencys, findByID, addcurrency };