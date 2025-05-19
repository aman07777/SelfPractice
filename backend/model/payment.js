import mongoose from "mongoose";

const paymentSchema =  mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    }
})

const Payment = mongoose.model("Payment",paymentSchema)

export default Payment