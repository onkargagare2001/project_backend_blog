import { Schema } from "mongoose";
import mongoose from "mongoose";

const playlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: { type: String, required: true, trim: true },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
        unique: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
