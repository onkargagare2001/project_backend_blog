import { Router } from "express";
// import { route } from "express/lib/application";
import registerUser from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);

export default router;
