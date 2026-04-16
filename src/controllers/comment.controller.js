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
    console.log("content>>>>>,", content);
    const { videoId } = req.params;
    const newComment = await Comment.create({
      content,
      video: videoId,
      owner: req.user._id,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, newComment, "New comment added"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    return res
      .status(200)
      .json(new ApiResponse(200, deletedComment, "comment deleted."));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text || text.trim() === "") {
      throw new ApiError(400, "Please put appropriate comment");
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content: text,
      },
      {
        new: true,
      }
    );

    return res
      .status(200)
      .json(new ApiResponse(200, updatedComment, "comment deleted."));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { getVideoComments, addComment, deleteComment, updateComment };
