
import User from "../model/user.js";
import catchAsync from "../utils/catchAsync.js";
import HttpError from "../utils/HttpError.js"
import { sendMail } from "../utils/sendMail.js";
import verificationCode from "../utils/verificationCode.js";
import crypto from "crypto"
// import { registerUserSchema } from "../schemas/authSchema.js";


export const registerUser = catchAsync(async(req,res,next)=>{
  const {email,password,confirmPassword,role} = req.body
// try{
//    const result = registerUserSchema.parse(req.body)
// }
// catch(err){
//   console.log(err.errors[0].message)
// }
 
 

  const code =verificationCode()
  console.log(code)

const expiry = Date.now()+10*60*1000
  const user = await User.create({email,password,confirmPassword,role,verificationCode:code,verificationExpiryDate:expiry,isVerified:false})
  if (!user){
    throw new HttpError(404,"user not found")
  }
  if(password !== confirmPassword){
    throw new HttpError(500,"password doesnot match")
  }
  const options ={
    to:user.email,
    subject:"verification code",
    text:`your code is ${code}`
  }
  await sendMail(options)
  res.status(201).json({success:"success",message:"registered successfully"})
  next()
})


export const verifyUser = catchAsync(async(req,res,next)=>{
  console.log("receive",req.body)
  const {verificationCode} = req.body;

  const user = await User.findOne({verificationCode})
  if (!user){
    throw new HttpError(404,"user not found")
  }
  if (user.isVerified){
    throw new HttpError(401,"user is already verified")
  }
  if(user.verificationCode ===null||user.verificationExpiryDate<Date.now()){
      throw new HttpError(401,"code is invalid or expired")
    }

  user.isVerified =true,
  user.verificationCode=null,
  user.verificationExpiryDate=null
  await user.save()

  res.status(200).json({status:"success",message:"the user is verified"})
  
next()
})



export const loginUser = catchAsync(async(req,res,next)=>{
  const {email,password} = req.body

  const user = await User.findOne({email})
  if (!user.isVerified){
    throw new HttpError(404,"email not found")
  }
   const matchPassword = await user.comparePassword(password)
   if (!matchPassword){
    throw new HttpError(401,"password does not macth")
   }
  
   const token = user.generateJWT()
   if(!token){
    throw new HttpError(404,"token not found")
   }
   res.json({status:'success',message:"token sent successfully",token})
   next()
})






export const resetPassword = catchAsync(async(req,res,next)=>{
const {token } = req.params
const {newPassword} = req.body


const hashToken = crypto.createHash("sha256").update(token).digest("hex")
const hashtokenExpiry = { $gt: Date.now() }

const user = await User.findOne({resetVerificationCode:hashToken,resetVerificationExpiryDate:hashtokenExpiry})

if (!user){
  throw new HttpError(404,"user with token not found")
}

user.password = newPassword
user.resetVerificationCode = null
user.resetVerificationExpiryDate =null

await user.save({ validateBeforeSave: false })
next()
})

export const forgotPassword =catchAsync(async(req,res,next)=>{

  const {email }= req.body

  const user = await User.findOne({email})
  if(!user){
    throw new HttpError(404,"user not found")
  }
  const resetToken = await user.resetpasswordToken()
const resetUrl = `http://localhost:8085/api/v1/auth/reset-password/${resetToken}`;

  const options={
  to:user.email,
  subject:"Reset Password",
  text:`click on the link to reset password ${resetUrl}`
}

await sendMail(options)
 await user.save()
 res.status(201).json({status:"success",message:"The reset url is sent"})
next()
})




export const updatePassword = catchAsync(async(req,res,next)=>{
  const {oldPassword,newPassword} = req.body

  const user = await User.findById({id:req.user.id})

  if(!user){
    throw new HttpError(404,"user not found")
  }
  const isMatch = user.comparePassword(oldPassword)
  if(!isMatch){
    throw new HttpError(500,"old password is incorrect")
  }
  user.password= newPassword
  await user.save()
  next()

})