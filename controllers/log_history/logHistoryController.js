const { response } = require('express'); // type response 4 our functions

const WishList = require('../../models/WishList'); // Model Product


const getHistory = async( req, res = response ) => {

    const idus = req.params.idus;

    try {
        
        const data_wish = await WishList.findOne({"userId": idus }) // consult products in wish list from DB
                                        .populate('products.idprod'); // see product's data
        
        let data_log_history = [];
        data_wish.products.forEach(e => {
            let data_product = {
                "name":e.idprod.name,
                "category": e.idprod.category,
                "stock": e.idprod.stock_quantity,
                "date_add": e.date_add,
            };
            data_log_history.push(data_product);
        });

        if( data_log_history.length == 0 ){
            res.status(404).json({
                ok: false,
                msg: 'No hay registro histórico de la Lista de Deseos'
            });
        } else {

            res.status(200).json( data_log_history );
        }


    } catch (error) {
        console.log( error );
        res.status(500).send("Oops! Error");
    }

}

module.exports =  {
    getHistory
}