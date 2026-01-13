import mongoose,{Schema} from "mongoose";

const videoSchema=new Schema({
  videoFile:{
    type:String,
    required:true
  },
  title:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  description:{
    type:String,
    required:true
  },
  
  duration:{
    type:Number,
    required:true
  },
  views:{
    type:Number,
    default:0
  },
  isPublished:{
    type:Boolean,
    required:true,
  },
  owner:{
    type:mongoose.schema.Types.ObjectId,
    ref:'User'
  }

},{timestamps:true});

export const Video = mongoose.model('Video',videoSchema);