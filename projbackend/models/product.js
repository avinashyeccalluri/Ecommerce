const mangoose = require('mongoose');

const {ObjectId} = mongoose.schema
const productSchema= new mangoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        trim:true,
        required:true,
        maxlength:2000
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true

    },
    category:{
        type:ObjectId,
        ref: "Category",
        required: true
    },
    stock:{
        type:Number,
        trim:true,
        required:true,
    },
    sold:{
        type:Number,
        default:0,        
    },
    photo:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})

module.exports=mongoose.model('Product',productSchema)


