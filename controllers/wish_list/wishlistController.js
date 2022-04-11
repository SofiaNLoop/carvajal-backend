const WishList = require('../../models/WishList'); // Model Product

const { response } = require('express'); // type response 4 our functions



// GET all products from wishlist
const getAllProdWish = async(req, res = response) => {

    const idus = req.params.idus;
    try {

        const data_wish = await WishList.findOne({"userId": idus }) // consult products in wish list from DB
                                        .populate('products.idprod'); // see product's data
        
        if ( data_wish.products.length == 0 ) { // first, search data from DB
            res.status(200).json( { // Send a message if doesn't exists data
                ok: false,    
                msg: '¡No has añadido productos a tu lista de deseos!'
            } );
        }  else { // if exists data, do  validation below

            let withStock = []; // array products with stock
            let withoutStock = []; // array products without stock

            data_wish.products.forEach (e => { // iterate wish list

                if ( e.idprod.stock_quantity > 0 ) { // there's stock of the product
                    withStock.push( e ); // add product to withStock array
                } else { // there isn't stock of the product 
                    withoutStock.push( e ); // add product to withoutStock array
                }
            }); 
        

            if ( withStock.length == 0) { // in case none of the products have stock
        
                res.status(200).json( {
                    ok: false,    
                    msg: '¡Ninguno de los productos de tu lista está en stock!',
                    withoutStock
                } );

            } else { // if any of the products have stock

                res.status(200).json( {
                    ok: true,    
                    withStock,
                    withoutStock
                } );

        }

        }                              

        


    } catch (error) {
        console.log( error );
        res.status(500).send("Oops! Error");
    }

}

// POST add product to wish list
const newProductWish = async( req, res = response ) => {
    
    const idus = req.params.idus; // get User ID from params  
    const idprod = req.params.idprod; // get Product ID from params 

    try {

        const getWishList = await WishList.findOne( {userId: idus} ); // consult user's wish list
        
        let hoy = new Date();
        let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
                                
        // console.log(fecha);

        const update = { // push function to add new products instead of replacing them
            $push: {
                products: {
                    idprod: idprod,
                    date_add: fecha
                }
            }
        }

        /*
            The next code is to send a message to the user when he wants 
            to add a product that's already in his wish list.
        */   
        if ( !getWishList.products.length == 0) { // if array products has data, use a for to iterate it 
            
            const idRepeated = getWishList.products.find( (element) => { 
                /* 
                    compares the id of the product 
                    that the user wants to add
                */
                return element.idprod == idprod;
            } );
            
            if ( idRepeated === undefined ) { // if that id doesn't exist, add the product to the wishlist
                
                const addProd = await WishList.findOneAndUpdate( {userId: idus}, update, {new: true});
                res.status(200).json( addProd );
                
            } else { // If already exists that id product, send the message 
                
                res.status(409).json({
                    ok: false,
                    msg: 'Este producto ya está en tu lista de deseos',
                });

            }  
            
        } else { // if array products is empty, add product to the wish list

            const addProd = await WishList.findOneAndUpdate( {userId: idus}, update, {new: true});  
            res.status(200).json( addProd ); 
            
        } // End of the If


    } catch (error) {
        console.log( error );
        res.status(500).send("Oops! Error");
    }

}

// DELETE product
const delProductWish = async( req, res = response ) => {

    const idus = req.params.idus; // get User ID from params  
    const idprod = req.params.idprod; // get Product ID from params

    try {
        
        const data_wish = await WishList.findOne( { userId: idus } ); // Get data user
        
        let index = data_wish.products.findIndex( (el) => { return el.idprod == idprod } ); // get index of id product

        const datos = data_wish.products.splice(index); // delete product from wish list 
        data_wish.save(datos); // Save that change in DB
        
        res.status(200).json( data_wish ); // resp to user

    } catch (error) {
        console.log(error);
    }

}



module.exports = {
    getAllProdWish,
    newProductWish,
    delProductWish,
    // notifyStock
}