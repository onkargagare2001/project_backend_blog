import mongoose from "mongoose";
// import {DB_name} from '../constants.js';

console.log(process.env.MONGODB_URI);

const connectDB= async()=>{
    // console.log("DB code running");
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
     console.log(`DB connected !! ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`DB connection failed with error ${error}`);
        process.exit(1);
    }
}

export default connectDB;