import express from "express";
import dotenv from 'dotenv'
import workoutRoute from './routes/workoutRoute.js'
import mongoose from "mongoose";

//express app
const app = express()

app.use(express.json())

// app.use((req,res,next)=>{
//     console.log(req.path, req.method)
//     next()
// })

dotenv.config()

//connect db

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser:true
}).then(()=>app.listen(process.env.PORT, ()=>console.log(`Listening at port ${process.env.PORT}`)))
.catch((error)=>
    console.log(error)
)

//routes
app.use('/workout', workoutRoute)