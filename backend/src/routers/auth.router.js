import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.route('/register').post(upload.none(), registerUser);



export default router;