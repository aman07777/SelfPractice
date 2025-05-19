import Product from "../model/product.js";
import catchAsync from "../utils/catchAsync.js";
import HttpError from "../utils/HttpError.js";
import fs from "fs"
export const createProduct =catchAsync(async(req,res,next)=>{

try {
        if(!req.files) throw new HttpError(404, "Please upload a image")
    const productImage = req.files.map(file=>file.path)


    const {productName,productDetails,productQuantity,productPrice,productDiscountPrice,category}= req.body
    console.log(category)

    const product = await Product.create({productName,productImage:productImage,productDetails,productQuantity,productPrice,productDiscountPrice})
    if(!product){
            throw new HttpError(404,"product not found")
    }

    res.status(200).json({status:"success",message:"Product is created"})
} catch (error) {
    const  files = req.files||(req.file?[req.file]:[])
   const deleteFile= files.map(file=>file.path)
   deleteFile.forEach((file)=>{
    fs.unlinkSync(file)
   })
  

    next(error)
}
})

export const getProducts = catchAsync(async(req,res,next)=>{
    const products = await Product.find()
   res.status(200).json({status:"success",message:"Product fetched succesfully",products})
    
})