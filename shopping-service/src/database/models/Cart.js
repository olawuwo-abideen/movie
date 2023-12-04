const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    customerId: { type: String },
    items: [
        {   
            movie: {
                _id: { type: String, require: true},
                title: { type: String },
                director: { type: String },
                genre: { type: String },
                releaseYear: { type: Number },
                plot: { type: String },
                rating: { type: Number },
                unit: { type: Number },
                price: { type: Number },
                available: { type: Boolean },
                review: { type: String }
            } ,
            unit: { type: Number, require: true} 
        }
    ]
});

module.exports =  mongoose.model('cart', CartSchema);

