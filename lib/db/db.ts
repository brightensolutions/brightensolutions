import mongoose from "mongoose"

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database Connected")
    } catch (error:any) {
        console.log(`Error: ${error.message}`);
    }
}

export default connectDb;