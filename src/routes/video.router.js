import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/verifyjwt.middleware.js";
import { publishAVideo } from "../controllers/video.controller.js";

const router = Router();

router.use(verifyjwt);

router.route("/uploadVideo").post(upload.single("video"), publishAVideo);

export default router;
