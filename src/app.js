import express from "express"
// import cors from "cors"
// import cookieParser from "cookie-parser"

const app = express()

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

import router from "./routes/user.router.js";

app.use('/api/v1',router);

export {app};