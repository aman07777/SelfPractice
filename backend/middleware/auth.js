import jwt from "jsonwebtoken"
import keys from "../configs/keys.js"
import catchAsync from "../utils/catchAsync.js"
import HttpError from "../utils/HttpError.js"


export const notFoundHandler = (req,res,next)=>{
    const error = new HttpError(404,"The response not found")
    next(error)
}

export const errorHandling =(err,req,res,next)=>{
    const statusPoint = err.statusPoint||500
    const message =err.message
    // console.log(message)
    const response ={
        status:"failed",message
    }
    res.status(statusPoint).json(response)

}

export const authenticate = catchAsync(async(req,res,next)=>{
    const authHeader = req.headers.authorization
     if (!authHeader || !(authHeader.startsWith("Bearer "))){
        throw new HttpError(404,"token not found")
     }
     const token = authHeader.split(" ")[1]
     const decoded = jwt.verify(
        token,keys.secret.JWT_SECRET
     )
     req.user=decoded
     next()
})

export const authorization = catchAsync(async(...roles)=>{
    return(req,res,next)=>{
        const userRoles = req.user?.roles
        if (!Array.isArray(userRoles)){
            throw new HttpError(404,"no role")
        }
        const hasRoles = userRoles.some(role=>roles.includes(role))
        if (!hasRoles){
            throw new HttpError(404,"no required role")
        }
        next()
    }
   

})