/*
    Path: /api/product/
*/

const express = require('express'); // express library const

const router = express.Router(); // call router from express library

const { getAllProducts, consultProducts } = require('../../controllers/product/productController'); // file from folder controllers
const { validateJWT } = require('../../middlewares/validateJWT'); // Middleware validate fields


// API's
router.get('/', validateJWT ,getAllProducts); // GET method

router.get('/:search', validateJWT ,consultProducts); // GET 4 consult products

module.exports = router;