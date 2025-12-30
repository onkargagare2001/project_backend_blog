import mongoose from "mongoose";
import {DB_name} from '../constants.js';

const connectDB= async()=>{
    // console.log("DB code running");
    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://onkargagare17:Snowrunner@1821@cluster0.zs3kg5b.mongodb.net/Videotube');
     console.log(`DB connected !! ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`DB connection failed with error ${error}`);
        process.exit(1);
    }
}

export default connectDB;