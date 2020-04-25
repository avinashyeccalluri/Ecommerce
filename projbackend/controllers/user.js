const User = require("../models/user");

const Order = require('../models/order');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DBwe"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req,res)=>{
  User.find().exec((err,user)=>{
    if(err || !user){
        return res.status(400).json({
          error : "None found"
        })
    }
    req.something=user;
    res.json(req.something)
  })
};

exports.updateUser =(req, res) =>{
  User.findByIdAndUpdate(
    {_id: req.profile._id},
    {$set : req.body},
    {new :true , useFindAndModify : false},
    (err , user)=>{
      if(err){
        return res.status.json({
          error: "The update is not successful"
        })
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  )
}

exports.userPurchaseList=(req,res)=>{
        Order.find({user: req.profile._id})
        .populate("user", "_id name")
        .execute((err, order)=>{
            if(err){
              return res.status(400).json({
                error : "orders are not stored"
              })
            }
             res.json(order)
        })
}

exports.pushOrderInPurchaseList= (req,res,next) =>{
  let purchases = []

  req.body.order.products.forEach(product=>{
      purchases.push({
        _id : product._id,
        name :product.name,
        description : product.description,
        category : product.category,
        quanity : product.quantity,
        amount : req.body.order.amount,
        transactionId : req.body.order.transaction_id
      });
  });

  //store this in db

  User.findOneAndUpdate(
    {_id : req.profile.id},
    {$push : {purchases :purchases}},
    {new :true},
    (err, purchase)=>{
      if(err){
        return res.status(400).json({
          error : "unable to save purchase list"
        });
      }
      next();
    }
  )


 
}
