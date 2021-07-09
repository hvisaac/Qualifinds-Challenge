const mongodb = require('mongoose');
const query = require('../models/query');

const findAllQuerys = (req, res) => {
    query.find((err, querys) => {
        err && res.send(500).send(err.message);

        res.status(200).json(querys);
    })   
}

const findByID = (req,res) => {
    query.findById(req.params.id, (err, query) => {
        err && res.status(500).send(err.message);

        res.status(200).json(query);
    })
}

const addquery = (req, res) => {
    let Query = new query({
        name: req.body.name,
        number: req.body.number,
        currency: req.body.currency,
        cotize: req.body.cotize,   
        currency_amount: req.body.currency_amount,
        cotize_amount: req.body.cotize_amount,
        available_money: req.body.available_money 
    })

    Query.save((err, usr) => {
        err && res.status(500).send(err.message);
        
        res.status(200).json(usr);
    }) 
}


module.exports = { findAllQuerys, findByID, addquery };