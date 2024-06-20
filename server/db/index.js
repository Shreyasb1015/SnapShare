import mongoose from "mongoose";


const connectDB=async()=>{
    try {
        
        const connectionInstnace=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}`)
        console.log(`Connected to the database!! DB HOST: ${connectionInstnace.connection.host}`)
    } catch (error) {
        console.log("MongoDB Connection Error: ", error)
        process.exit(1)
        
    }
}

export default connectDB;
