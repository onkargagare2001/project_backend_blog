import jwt from "jsonwebtoken";
import { User } from "../models/user.models";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const verifyjwt = asyncHandler(async (req, res) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN);

    const user = await User.findById(decodeToken._id);
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(400, "Invalid refresh or access token");
  }
});
