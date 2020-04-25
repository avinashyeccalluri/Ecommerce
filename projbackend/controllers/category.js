const Category = require('../models/category');



exports.getCategoryById = (req, res, next ,id)=>{
    
    Category.findById(id).exec((err , cate)=>{
        console.log(err);
        
        if(err){
            return res.status(400).json({
                error : "Category not found in db"
            });
        }
        req.category = cate;
        next();
    });
    
};

exports.createCategory = (req, res)=>{
    const category = new Category(req.body);
    category.save((err , cate)=>{
        if(err || !cate){
            return res.status(400).json({
                error : "Not able to save category in Db"
            })
        }
         res.json({cate});
    })
};

exports.getCategory = (req,res) =>{
    return res.json(req.Category)
};

exports.getAllCategory = (req,res) =>{
    Category.find().exec((err, items)=>{
        if(err || !cate){
            return res.status(400).json({
                error : "No items in the DB"
            })
        }
         res.json(items)
    })
};

exports.updateCategory = (req,res)=>{
    const category = req.category;
    category.name = req.body.name;
    
    category.save((err,updatedCategory)=>{
        if(err  ){
            return res.status(400).json({
                error : "The category cannot be updated"
            })
        }

        res.json(updatedCategory);
    })

}

exports.removeCategory = (req,res) =>{
    const category = req.category;
    category.remove((err, catrgory)=>{
        if(err){
            return res.status(400).json({
                error : "The category cannot be deleted"
            });
        }
        res.json({
            message : "Successfully deleted"
        });
    });
};