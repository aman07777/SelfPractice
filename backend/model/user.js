import mongoose from "mongoose"
import { ROLES } from "../configs/constant.js"
import jwt from "jsonwebtoken"
import keys from "../configs/keys.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    role:{
        type:[String],
        enum:Object.values(ROLES),
        default:[ROLES.USER]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationCode:{
        type:String
    },
    verificationExpiryDate:{
        type:Date
    },
      resetVerificationCode:{
        type:String,
      },
      resetVerificationExpiryDate:{
        type:Date
      }
}, {timeStamps:true})

userSchema.pre("save",async function(next){
if (!this.isModified("password")) return next()
const salt = await bcrypt.genSalt()
this.password = await bcrypt.hash(this.password,salt)
next()

})

userSchema.methods.comparePassword = async function(password){
   return (await bcrypt.compare(password,this.password))
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({
        id:this._id,
        email:this.email,
        role:this.role
    },keys.secret.JWT_SECRET,{expiresIn:keys.secret.EXPIRES})
}

userSchema.methods.resetpasswordToken =async function(){
  const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetVerificationCode = crypto.createHash("sha256").update(resetToken).digest("hex")
  this.resetVerificationExpiryDate= Date.now()+10*60*1000
  return resetToken
}   
const User = mongoose.model("User",userSchema)
export default User