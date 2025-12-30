import mongoose, { mongo } from "mongoose";
import DB_name from './src/constants.js';

const connectDB= async()=>{
    try {
        const connectionInstance = await mongoose.connect(`/${DB_name}`);
     console.log(`DB connected !! ${connectionInstance}`);

    } catch (error) {
        console.log(`DB connection failed with error ${error}`)
    }
}

export default connectDB;