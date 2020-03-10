var mongoose = require('mongoose');
const crypto= require('crypto');
const uuidv1 = require ('uuid/v1');
  var Schema = mongoose.Schema;

    var someSchema=new Schema({

    })

  var userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        // required:true,
        unique:true
    },
    userinf0:{
        type:string,
        trim:true
    },
    encry_password:{
        type:String,
        trim:false,
        required:true,
    },
    salt:string,
    role:{
        type:number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    }
  });


  userSchema.virtual("password")
    .set(function(password){
        this._password=password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    });

  userSchema.method = {
    authenticate : function(plainpassowrd){
        return this.securePassword(plainpassowrd)=== this.encry_password;
    },


      securePassword :function(plainPassword){ 
          if(!password) return "";
          try{
                return crypto
                .createHmac("sha256",this.salt)
                .update(plainPassword)
                .digest('hex');
          }catch(err){
              return "";
          }
      }
  }
  module.exports=mongoose.model("User",userSchema);