const mongoose = require ('mongoose')

const {ObjectId} = mongoose.Schema

const productCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    }
})

const orderSchema = new mongoose.Schema({
    products:[productCartSchema],
    transaction_id:{},
    amount:{
        type:Number
    },
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})