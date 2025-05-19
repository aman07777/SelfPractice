import sendGrid from "@sendgrid/mail"
import keys from "../configs/keys.js"
import catchAsync from "./catchAsync.js"
import HttpError from "./HttpError.js"

sendGrid.setApiKey(keys.email.SEND_GRID_KEY)


export const sendMail=catchAsync(async(options)=>{
   
    const msg ={
        to:options.to,
        from:keys.email.HOST_EMAIL,
        subject:options.subject,
        text:options.text,

    }
    console.log(msg.from)
   const info = await sendGrid.send(msg)
   console.log("email sent")
   return info
}
)
