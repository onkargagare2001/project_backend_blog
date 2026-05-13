import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.user._id;
  // TODO: toggle subscription
  const deleted = await Subscription.findOneAndDelete({
    channel: channelId,
    subscriber: userId,
  });

  if (deleted) {
    return res
      .status(200)
      .json(new ApiResponse(200, deleted, "channel unsubscribed"));
  }

  const subscribed = await Subscription.create({
    channel: channelId,
    subscriber: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, subscribed, "channel subscribed"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const subscribers = await Subscription.find({
    channel: channelId,
  });

  if (!subscribers.length) {
    throw new ApiError(400, "no susbcribers for this channel");
  }

  const count = subscribers.length;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { subscribers, count },
        count ? "Subscribers fechted" : "0 subscribers found"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  const subscribedChannels = await Subscription.find({
    subscriber: subscriberId,
  })
    .populate("channel", "username avatar")
    .select("channel createdAt");

  const channels = subscribedChannels.map((item) => ({
    _id: item.channel._id,
    username: item.channel.username,
    avatar: item.channel.avatar,
    createdAt: item.createdAt,
  }));

  const count = subscribedChannels.length;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channels,
        count
          ? "all subscribedChannels channels fetced"
          : "no channel found subscriubers has subscribed"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
