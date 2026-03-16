import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyjwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decodeToken?._id).select(
      "-password -refreshToken"
    );
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, "Invalid refresh or access token");
  }
});

export { verifyjwt };
