import { mongoose,model,Schema } from "mongoose";
const paymentSchema=new mongoose.Schema({
    razorpay_payment_id:{
        type:'String',
        require:true
    },
razorpay_subscription_id:{
    type:'String',
    require:true
},
razorpay_signature:{
    type:'String',
    require:true
}
})
export default new mongoose.model('payments',paymentSchema)