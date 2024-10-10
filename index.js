const express=require('express');
const dotenv=require('dotenv');
dotenv.config();
const connectDb=require('./config/index');

const app=express();;
connectDb();
const port=process.env.NODE_LOCAL_PORT || 3020;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/',require('./routes/user'))
app.listenerCount(port,()=>{
    console.log(`Server is running on port ${port}`)
})