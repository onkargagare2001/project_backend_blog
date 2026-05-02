import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video
  const { title, description } = req.body;
  const videoPath = req.file?.path;

  console.log("Videppat?>>>>>", videoPath);

  const uploadedVideo = await uploadOnCloudinary(videoPath);

  if (!uploadedVideo) {
    throw new ApiError(
      400,
      "something got wrig nwhile uploading video, please upload valid file"
    );
  }

  const video = await Video.create({
    videoFile: uploadedVideo.url,
    title: title,
    description: description,
    duration: 12,
    views: 500,
    isPublished: true,

    owner: req.user?._id,
  });

  if (!video) {
    throw new ApiError(500, "Something failed while creating video profile");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Videp uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  //TODO: get video by id

  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      throw new ApiError(400, "video not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, video, "Video fetched sucessfully"));
  } catch (error) {
    new ApiError(400, "something went wrong");
  }
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const { title, description } = req.body;
  const thumbnailPath = req.file?.path;

  const thumbnailUrl = await uploadOnCloudinary(thumbnailPath);

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      title: title,
      description: description,
      thumbnail: thumbnailUrl.url,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video detaisl Updated"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
