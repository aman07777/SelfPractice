import multer from "multer"
import path from "path"
import { imagePath } from "../utils/imagePath.js"

// const imagePath =path.join(path.resolve(),"public","uploads")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
       cb(null,imagePath)

    }
    ,
    filename:function(req,file,cb){
        const imageName = Date.now() + "_"+ Math.floor(Math.random()*1E9)
        cb(null,file.fieldname+imageName+path.extname(file.originalname))
    }

})
 function fileFilter(req,file,cb){
const allowedImages =["image/jpeg","image/png","image/webp"]

if (allowedImages.includes(file.mimetype)){
    return cb(null,true)
}
cb(new Error("file type is not jpeg ,png or webp"),false)
}

const uploads = multer({storage:storage,limits:2000,fileFilter:fileFilter})

export default uploads
    
