import mongoose from "mongoose";
const querySchema=new mongoose.Schema({
    firstName:{
       type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    message:{
        type:String
    }
})
export default new mongoose.model('Querys',querySchema)