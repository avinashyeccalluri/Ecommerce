const product = require('../models/product');

exports.getProductById = (req, res, next, id) =>{
        product.findById(id)
            .populate("category")
            .exec((err, product)=>{
                if(err){
                    return res.status(400).json({
                        error : "No product found"
                    })
                }
                req.product = product ;
                next();
        })
}