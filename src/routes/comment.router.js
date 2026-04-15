import { verifyjwt } from "../middlewares/verifyjwt.middleware.js";
import { addComment } from "../controllers/comment.controller.js";
import { getVideoComments } from "../controllers/comment.controller.js";
import { Router } from "express";

const router = Router();

router.use(verifyjwt);

router.route("/:videoId").get(getVideoComments).post(addComment);

export default router;
