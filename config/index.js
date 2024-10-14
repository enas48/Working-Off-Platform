import mongoose from 'mongoose'
const url='mongodb://127.0.0.1:27017/docker-node-mongo';

const connectDb=()=>{
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(url);
        console.log("Connected to Mongo Successfully!");
      } catch (error) {
        console.log(error);
      }

}
export default connectDb