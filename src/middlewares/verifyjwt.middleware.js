import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyjwt = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log(token);

  if (!token) {
    throw new ApiError(401, "Invalid access request");
  }

  const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);

  const user = await User.findById(decodeToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(401, "Invalid access Token");
  }

  req.user = user;
  next();
  // } catch (error) {
  //   throw new ApiError(400, error.message || "Invalid refresh or access token");
  // }
});
