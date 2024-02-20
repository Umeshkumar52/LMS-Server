import { mongoose,Schema,model } from "mongoose";
const courseSchema=new mongoose.Schema({
tittle:{
    type:String,
    require:[true,'tittle is mandatory'],
    minlenght:[5,'tittle must be less than 5 characters'],
    maxlenght:[50,'tittle must be less than 50 characters']
},
description:{
    type:String,
    require:[true,'tittle is mandatory'],
    minlenght:[20,'tittle must be less than 5 characters'],
    maxlenght:[200,'tittle must be less than 50 characters']
},
createBy:{
    type:String
},
lecturesCount:{
    type:Number,
    require:true
},
thumnail:{
    publice_id:'String',
    secure_url:'String'

},
lectures:[{
    tittle:'String',
    description:'String',
    lecture:{
        publice_id:{
            type:'String',
            require:true
        },
        secure_url:{
            type:'String',
            require:true
        }
    }
}],
},
{
    timestamps:true
})
export default new mongoose.model('Courses',courseSchema)