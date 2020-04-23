const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  console.log(id);
  
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
