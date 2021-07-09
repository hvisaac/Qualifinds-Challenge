const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const querySchema = new Schema(
    { 
        name: {type: String },
        number: {type: String },
        currency: { type: String },
        cotize: { type: String },   
        currency_amount: { type: mongoose.Decimal128 },
        cotize_amount: {type: mongoose.Decimal128 },
        available_money: {type: mongoose.Decimal128 } 
    }
);

module.exports = query = mongoose.model('query', querySchema);