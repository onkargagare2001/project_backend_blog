import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:[true,"It is required"]
    }

},{timestamps:true});