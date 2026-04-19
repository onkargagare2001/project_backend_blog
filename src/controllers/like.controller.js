import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  try {
    if (!isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid Video ID");
    }
    const videoLikeStatus = await Like.findOne({
      video: videoId,
      likedBy: req.user?._id,
    });

    let toggleLike;

    if (!videoLikeStatus) {
      await Like.create({
        video: videoId,
        likedBy: req.user?._id,
      });
      toggleLike = true;
    }

    if (videoLikeStatus) {
      await Like.deleteOne({
        video: videoId,
      });
      toggleLike = false;
    }

    return res
      .status(200)
      .json(new ApiResponse(200, toggleLike, "user like status changed "));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  try {
    if (!isValidObjectId(commentId)) {
      throw new ApiError(400, "Invalid comment ID");
    }
    const commentLikeStatus = await Like.findOne({
      video: commentId,
      likedBy: req.user?._id,
    });

    let toggleLike;

    if (!commentLikeStatus) {
      await Like.create({
        comment: commentId,
        likedBy: req.user?._id,
      });
      toggleLike = true;
    }

    if (commentLikeStatus) {
      await Like.deleteOne({
        comment: commentId,
      });
      toggleLike = false;
    }

    return res
      .status(200)
      .json(new ApiResponse(200, toggleLike, "user like status changed "));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  try {
    if (!isValidObjectId(tweetId)) {
      throw new ApiError(400, "Invalid tweet ID");
    }
    const tweetLikeStatus = await Like.findOne({
      tweet: tweetId,
      likedBy: req.user?._id,
    });

    let toggleLike;

    if (!tweetLikeStatus) {
      await Like.create({
        tweet: tweetId,
        likedBy: req.user?._id,
      });
      toggleLike = true;
    }

    if (tweetLikeStatus) {
      await Like.deleteOne({
        tweet: tweetId,
      });
      toggleLike = false;
    }

    return res
      .status(200)
      .json(new ApiResponse(200, toggleLike, "user like status changed "));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user?._id;

  const likedVideos = await Like.aggregate([
    {
      $match: {
        likedBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $project: {
        _id: 0,
        video: {
          $arrayElemAt: ["videoDetails", 0],
        },
      },
    },
    {
      project: {
        _id: "$video._id",
        title: "$video.title",
        description: "$video.description",
        videoFile: "$video.videoFile",
        duration: "$video.duration",
        views: "$video.views",
        owner: "$video.owner",
      },
    },
  ]);

  if (!likedVideos) {
    throw new ApiError(400, "User not liked no videos");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, likedVideos, "User liked cideos fecthced."));
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
