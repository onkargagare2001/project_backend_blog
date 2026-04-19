import express from "express";
// import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

import router from "./routes/user.router.js";
import commentRouter from "./routes/comment.router.js";
import videoRouter from "./routes/video.router.js";

app.use("/api/v1", router);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/video", videoRouter);

export { app };
