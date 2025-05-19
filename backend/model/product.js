import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productImage:{
        type: [String],
        required:true
    },
    productDetails:{
        type:String,
        required:true
    },
    productQuantity:{
        type:Number,
        required:true
    },
    productPrice:{
        type:Number,
        required:true
    },
    productDiscountPrice:{
        type:Number,
        required:false
    },
},{timeStamps:true})

const Product = mongoose.model("Product",productSchema)
export default Product