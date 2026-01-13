import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        index:true
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
    avatar:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        required:[true,"It is required"]
    },
    watchHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Video'
    }
    ]

},{timestamps:true});

export const User = mongoose.model('User',userSchema);