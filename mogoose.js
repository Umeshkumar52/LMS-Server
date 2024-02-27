import mongoose from "mongoose";
let url="mongodb://localhost:27017/UsersCollection"
// let url=process.env.MONGOOSE_URL
const dbconnect=async()=>{
   await mongoose.connect(url)
}
export default dbconnect;
