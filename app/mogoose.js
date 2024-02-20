import mongoose from "mongoose";
let url="mongodb://localhost:27017/UsersCollection"
const dbconnect=async()=>{
   await mongoose.connect(url)
}
export default dbconnect;
