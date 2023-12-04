const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: String,
    director: String,
    genre: String,
    releaseYear: Number,
    plot: String,
    rating: Number,
    unit: Number,
    price: Number,
    available: Boolean,
    review: String
});

module.exports =  mongoose.model('movie', MovieSchema);