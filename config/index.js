const mongoose= require('mongoose');

const url='mongodb://mongo:27017/docker-node-mongo';

const connectDb=()=>{
    mongoose.connect(url, ()=>{
        console.log('connected to mongoDB')
    })
}
module.exports=connectDb;