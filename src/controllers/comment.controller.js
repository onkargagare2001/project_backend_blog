import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const comments = await Comment.find({
    video: videoId,
  });

  if (!comments?.length) {
    throw new ApiError(400, "no comments found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched"));
});

const addComment = asyncHandler(async (req, res) => {
  try {
    const { content } = req.body;
    const { videoId } = req.params;
    const newComment = await Comment.create({
      content,
      video: mongoose.Schema.Types.ObjectId(videoId),
      owner: mongoose.Schema.Types.ObjectId(req.user._id),
    });
    res.status(200).json(new ApiResponse(200, newComment, "New comment added"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { getVideoComments, addComment };
