import express from 'express'
const app = express();

app.get('/', (req,res)=>{
    res.send("Hello i am ready to serve!!!!")
})

app.listen(3000);