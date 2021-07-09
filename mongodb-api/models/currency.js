const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema(
    { 
        currency: { type: String },   
        available_money: { type: String }
    }
);

module.exports = currency = mongoose.model('currency', currencySchema);