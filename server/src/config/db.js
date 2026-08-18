import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("Mongodb connected successfully");
        
    } catch(error){
        console.log("MongoDDB connection failed: ", error.message);
        
        process.exit(1);
    }
}

export default connectDB;