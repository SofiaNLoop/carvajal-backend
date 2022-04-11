const mongoose = require('mongoose'); // from mongoose library

// Schema Product Created
const productSchema = mongoose.Schema({

    name: {
        type: String,
        require: true    
    },

    brand: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock_quantity: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true
    },

    img: {
        type: String,
        require: true
    },

    date_create: {
        type: Date,
        default: Date.now()
    }
});

// exports model and call DB collection 
module.exports = mongoose.model('product', productSchema);


