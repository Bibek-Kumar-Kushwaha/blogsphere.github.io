import express from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './Config/connectDB.js';
import router from './Routes/userRoutes.js';
const app = express();

app.get('/', (req,res)=>{
    res.send("Hello i am ready to serve!!!!")
})

//middleware
app.use(express.json());


//Routes
app.use('/api/v1/user', router)

//Connect to Database
connectDB();

app.listen(3000);