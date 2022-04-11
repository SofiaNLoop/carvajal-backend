const { Schema, model }= require('mongoose'); // from mongoose library

// Schema Wish List Created
const productSchema = Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'    
    },

    products: [
        { 
        idprod: {
            type: Schema.Types.ObjectId, ref: 'product'
        },
        date_add: {
            type: Date,
            default: Date.now()
        }
    }
    ],

    
});

// exports model and call DB collection 
module.exports = model('wish_list', productSchema);
