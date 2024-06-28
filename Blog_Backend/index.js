import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

import connectDB from './Config/connectDB.js';
const app = express();

app.get('/', (req,res)=>{
    res.send("Hello i am ready to serve!!!!")
})

connectDB();

app.listen(3000);