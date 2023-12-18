const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    creditcardName: String,
    currency : String,
    creditcardNumber : Number,
    cvc : Number,
    expiryMonth: Number,
    expiryYear : Number
});

module.exports =  mongoose.model('payment', PaymentSchema);



