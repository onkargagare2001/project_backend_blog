import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const videoResult = await Video.aggregate([
    {
      $match: {
        owner: req.user?._id,
      },
    },
    {
      $count: "videoCount",
    },
    {
      $project: {
        $views: 1,
      },
    },
  ]);

  const videoCount = videoResult[0].videoCount || 0;
  // const totalViews = this is todo later in day

  const subscribersResult = await Subscription.aggregate([
    {
      $match: {
        channel: req.user_id,
      },
    },
    {
      $count: "subscribers",
    },
  ]);

  const subscribers = subscribersResult[0]?.subscribers || 0;

  const likesCountResult = await Like.aggregate([
    {
      $match: {
        video: {
          $ne: null,
        },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videoResult",
      },
    },
    {
      $unwind: "$videoResult",
    },
    {
      $match: {
        "videoResult.owner": req.user?._id,
      },
    },
    {
      $count: "likesCount",
    },
  ]);

  const likesCount = likesCountResult[0]?.likesCount || 0;
  res
    .status(200)
    .json(
      new ApiResponse(200, { likesCount, subscribers }, "All stats fectched")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
});

export { getChannelStats, getChannelVideos };
