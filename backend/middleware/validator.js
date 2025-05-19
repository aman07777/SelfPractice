// import HttpError from "../utils/HttpError.js";
export const validator=(schema)=>{
    return(req,res,next)=>{
       const result= schema.safeParse(req.body)
       console.log(result)
       if (!result.success){
        console.log(result.error.errors[0].message)
        return res.status(400).json({status:"failed"})
       }
       req.body=result.data
    next()
    }
}
// export const validator = (schema)=>{
//     return (req,res,next)=>{
//         const result = schema.safeParse(req.body)
//         if(!result.sucess){
//             res.status(400).json({message:result.error[0]})
//         }
//         next()
//     }
// }