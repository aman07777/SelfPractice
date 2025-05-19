// import HttpError from "../utils/HttpError.js";
export const validator=(schema)=>{
    return(req,res,next)=>{
        try{
        const result = schema.parse(req.body)
            req.validatedBody = result; 
    }
    catch(error){
        const message = error.errors[0].message;
        res.status(400).json({message:message})
        console.log(message)
    }
    next()
    }
    
    
}