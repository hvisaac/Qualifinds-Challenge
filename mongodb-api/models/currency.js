const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema(
    { 
        currency: { type: String },   
        available_money: { type: mongoose.Decimal128 }
    }
);

module.exports = currency = mongoose.model('currency', currencySchema);