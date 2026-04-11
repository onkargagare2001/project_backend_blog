import { Router } from "express";
// import { route } from "express/lib/application";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/user.controller.js";
import { logoutUser } from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/verifyjwt.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
import { changeCurrentPassword } from "../controllers/user.controller.js";
import { updateAvatar } from "../controllers/user.controller.js";
import { updateAccountDetails } from "../controllers/user.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
import { getUserWatchHistory } from "../controllers/user.controller.js";
// import { verify } from "jsonwebtoken";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyjwt, logoutUser);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/changeCurrentPassword").post(verifyjwt, changeCurrentPassword);
router
  .route("/updateAvatar")
  .patch(verifyjwt, upload.single("avatar"), updateAvatar);

router.route("/updateAccountDetails").patch(verifyjwt, updateAccountDetails);

router.route("/c/:username").get(verifyjwt, getUserProfile);
router.route("/getUserWatchHistory").get(verifyjwt, getUserWatchHistory);

export default router;
