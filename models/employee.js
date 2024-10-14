import { Schema, model } from 'mongoose'

const employeeSchema= new Schema(
    {
        name:{
            type:String,
            required: true
        },
        surname:{
            type:String,
            required: true
        },
        department:{
            type:Schema.Types.ObjectId,
            ref:'Department',
            required: true
        }
    },{
        timestamps:true
    }
)

const Employee = model('Employee', employeeSchema)
export default Employee

