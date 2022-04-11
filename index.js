const express = require('express'); //Use express library
const connect_DB = require('./config/db'); // call file to connect DB


const app = express(); // Const 4 use express

const cors = require('cors');

connect_DB(); // Function connection DB

// App.use
app.use(cors()); // config cors

app.use(express.json()); // read json body


// API URL created
app.use('/api/product', require('./routes/product/getProducts')); // Products Methods
app.use('/api/wishlist', require('./routes/wish_list/getWishList')); // Wish List Methods
app.use('/api/history', require('./routes/log_history/getLogHistory')); // Wish List Methods
app.use('/api/user', require('./routes/user/user')); // Wish List Methods

// app.listen 4 use a port
app.listen(process.env.PORT, () => {
    console.log(`App running in: http://127.0.0.0:${ process.env.PORT }` );
})