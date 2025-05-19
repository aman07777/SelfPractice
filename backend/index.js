import express from "express"
import mongoose from "mongoose"
import keys from "./configs/keys.js"
import { errorHandling, notFoundHandler } from "./middleware/auth.js"
import userRoutes from "../backend/routes/userRoutes.js"
import { imagePath } from "./utils/imagePath.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(imagePath))

mongoose.connect(keys.database.MONGO_DB).then(()=>{
  console.log("MONGO db connected ")  }).catch(()=>{
    console.log("mongodb not connected")

})
app.use('/api/v1/auth',userRoutes)
app.use(notFoundHandler)
app.use(errorHandling)

app.listen(keys.environment.PORT,()=>{
console.log("server on port",keys.environment.PORT)
})