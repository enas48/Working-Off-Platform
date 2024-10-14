import { Schema, model } from 'mongoose'

const departmentSchema= new Schema(
    {
        name:{
            type:String,
            required: true
        },
        employees:[{
            type:Schema.Types.ObjectId,
            ref:'Employee'
        }]
    },{
        timestamps:true
    }
)
const Department =model('Department', departmentSchema)
export default Department

