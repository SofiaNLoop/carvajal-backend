const { Schema, model }= require('mongoose'); // from mongoose library

// Schema User Created
const userSchema = Schema({

    name: {
        type: String,
        require: true    
    },
    last_name: {
        type: String,
        require: true    
    },
    email: {
        type: String,
        require: true    
    },
    password:{
        type:String,
        require: true
    },

    wish_list:{ 
        type: Schema.Types.ObjectId, 
        ref: 'wish_list' 
    },

    date_create: {
        type: Date,
        default: Date.now()
    }
});

// "name": "Juan",
//   "last_name": "Rodriguez",
//   "email": "juan@gmail.com",
//   "password": "123"

// exports model and call DB collection 
module.exports = model('user', userSchema);

