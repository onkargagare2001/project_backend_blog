import { verifyjwt } from "../middlewares/verifyjwt.middleware.js";
import { addComment } from "../controllers/comment.controller.js";
import {
  getVideoComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";
import { Router } from "express";

const router = Router();

router.use(verifyjwt);

router.route("/:videoId").get(getVideoComments).post(addComment);
router.route("/c/:commentId").get(deleteComment).patch(updateComment);
// router.route("/:videoId").post(addComment);

export default router;
