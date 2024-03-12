import express from "express";
import dotenv from "dotenv";
import {connect} from "./db/db.js"
import authroutes from './routes/auth.js';
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

//Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth",authroutes)

app.use((err,req,res,next)=>{
    const status = err.status||500;
    const message = err.message||"ERROR";
    console.log(err);
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})
  

//server listens on port 3001
app.listen(3001,()=>{
    //connecting to database
    connect()
    //connecting to server
    console.log("connected");
})