/*
    Path: /api/wishlist/
*/

const express = require('express'); // express library const

const router = express.Router(); // call router from express library

const { getAllProdWish, newProductWish, delProductWish } = require('../../controllers/wish_list/wishlistController'); // file from folder controllers
const { validateJWT } = require('../../middlewares/validateJWT');

// CRUD Wish List
router.get('/:idus', validateJWT ,getAllProdWish); // GET products from wish

router.post('/:idus/:idprod', newProductWish); // POST add product to wish        


// router.put('/', getAllWish);
router.delete('/:idus/:idprod', validateJWT ,delProductWish);


module.exports = router;