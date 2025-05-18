import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import { errorHandler } from "./middlewares/errorHandler.js"
import router from "./routes/index.routes.js"
dotenv.config()

const app=express()
//middlewares
app.use(express.json())
app.use(cors())

//routes
//app.use(router)
const port=process.env.PORT || 3000  
//connect to database
mongoose.connect(process.env.DATABASE)
.then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port ${port}`)
        console.log("database connected")
    })  
})
.catch((error)=>{
    console.log(error.message)
})
// errorHandler middleware
 app.use(errorHandler)