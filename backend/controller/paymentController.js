// http://localhost:8085/api/v1/auth/stripe-webhook

import Stripe from  "stripe"
import keys from "../configs/keys"
import catchAsync from "../utils/catchAsync"
import Payment from "../model/payment"
import HttpError from "../utils/HttpError"

const stripe = new Stripe(keys.payment.STRIPE_KEY)

export const createPayment =catchAsync(async(req,res,next)=>{
    const payload = req.body

    const signature = req.headers["stripe-signature"]
    let event;

    event = stripe.webhooks.constructEvent(payload,signature,keys.payment.STRIPE_WEBHOOK)

    switch(event.type){
        case"payment_intent.succeeded":
        const payment = Payment.create({
            user_id:req.user.id,
            
        })
    }

  
   
}

)