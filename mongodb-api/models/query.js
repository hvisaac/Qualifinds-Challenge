const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema(
    { 
        name: {type: String },
        number: {type: String },
        currency: { type: String },
        quote: { type: String },   
        currency_amount: { type: mongoose.Decimal128 },
        quote_amount: {type: mongoose.Decimal128 },
        available_money: {type: mongoose.Decimal128 }, 
        fee_cost: {type: mongoose.Decimal128}
    }
);

module.exports = query = mongoose.model('query', querySchema);