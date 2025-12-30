// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import mongoose from "mongoose";
// import connectDB from "./db/index.js";
console.log("App is running");
dotenv.config();

const connectDB= async()=>{
    // console.log("DB code running");
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
     console.log(`\nDB connected !! ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`DB connection failed with error ${error}`);
        process.exit(1);
    }
}



connectDB().then(()=>{
    console.log("sucess");
}).catch(()=>{
    console.log('failed');
});










/*
import express from "express"
const app = express()
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()

*/