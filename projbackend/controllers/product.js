const Product = require('../models/product');

const formidable = require("formidable");

const _ = require("lodash");

const fs = require("fs");

exports.getProductById = (req, res, next, id) =>{
        Product.findById(id)
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

exports.createProduct = (req, res) =>{
    let form = new formidable.IncomingForm();  

    form.keepExtensions = true;

    //keepExtensions will trim the formats of the images that displays
     // the form variable assigned to form requires three parameter (error , form_inputs , file(audio,video,images))

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "The data caused some errror or problem with image"
            });
        }

        //destructure the fields

        const{ name,description ,price, category, stock} = fields;

        if(
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error : "Please include all the fields"
            })
        }

        //TODO : restriction on fields

        let product = new Product(fields);

        //handle the file size

        if(file.photo){
            if(file.photo.size > 2097152){
                return res.status(400).json({
                    error : "File size is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type  //type refers to whatever the image format
        }

        //save to db
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error : "saving tshirt failes"
                });
            }

            res.json(product);
        })

    });


}

exports.getProduct = (req, res) =>{
    req.product.photo = undefined;
    return res.json(req.product);
}

exports.updateProduct = (req, res) =>{
    let form = new formidable.IncomingForm();  

    form.keepExtensions = true;

    //keepExtensions will trim the formats of the images that displays
     // the form variable assigned to form requires three parameter (error , form_inputs , file(audio,video,images))

    form.parse(req, (err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error: "The data caused some errror or problem with image"
            });
        }

        //destructure the fields        

        //TODO : restriction on fields        

        let product = req.product;

        // THE BELOW CODE IS RESPONSINBLE FOR THE UPDATION OF THE PRODUCT

        product = _.extend(product, fields)  // the fields are getting loading into the product VARIABLE

        //handle the file size

        // handle the file size

        if(file.photo){
            if(file.photo.size > 2097152){
                return res.status(400).json({
                    error : "File size is too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type  //type refers to whatever the image format
        }

        //save to db
        product.save((err,product)=>{
            if(err){
                res.status(400).json({
                    error : "UPDATION HAVE FAILED"
                });
            }

            res.json(product);
        })

    });


}

exports.deleteProduct = (req, res)=>{
    let product =req.product;
    product.remove((err, product)=>{
        if(err){
            return res.status(400).json({
                error: "The product was not deleted"
            })
        }
        res.json({
            message : "Deletion was sucessful",product
        })
    })
}

//middleware
exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

