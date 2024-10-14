import express from 'express'
import { config } from "dotenv";
config();

import connectDb from './config/index.js'
import employeeApis from './routes/department.js'
import departmentApis from './routes/employee.js'



const app=express();
connectDb();
const port=process.env.NODE_LOCAL_PORT || 3020;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello world')
})

// app.use('/',require('./routes/user'))
app.use('/employees', employeeApis)
app.use('/departments', departmentApis)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})