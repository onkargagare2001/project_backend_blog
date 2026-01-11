import mongoose,{Schema} from "mongoose";

const videoSchema=new Schema({
  title:{
    type:String,
    required:true,
    unique:true
  },
  owner:{
    type:mongoose.schema.Types.ObjectId,
    ref:'User'
  }

},{timestamps:true});

export const Video = mongoose.model('Video',videoSchema);