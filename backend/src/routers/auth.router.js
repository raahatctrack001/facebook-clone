import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.route('/register').post(upload.none(), registerUser);
router.route('/login').post(upload.none(), loginUser)


export default router;