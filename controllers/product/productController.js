const Product = require('../../models/Product'); // Model Product

const { response } = require('express'); // type response 4 our functions

// GET all products
const getAllProducts = async( req, res = response ) => {

    

    try {

        let desde = Number(req.query.desde)  || 0;


        // const data_prod = await Product.find();

        const [ products, total ] = await Promise.all([
            Product
                .find()
                .skip( desde )
                .limit( 1 ),

            Product.count()
        ]);

        

        res.status(201).json( {
            ok: true,
            products,
            total,
            
        } );
        
    } catch (error) {
        console.log( error );
        res.status(500).send("Oops! Error");
    }


}

const consultProducts = async( req, res = response ) => {

    const search = req.params.search;
    const regex = new RegExp( search, 'i' );

    try {

        const searchProduct = await Product.find({ name: regex }); 
        const searchBrand = await Product.find({ brand: regex }); 
        const searchCategory = await Product.find({ category: regex }); 

        res.status(200).json({
            searchProduct,
            searchBrand,
            searchCategory
        });

    } catch (error) {
        console.log( error );
        res.status(500).send("Oops! Error");
    }

}


module.exports = {
    getAllProducts,
    consultProducts
}