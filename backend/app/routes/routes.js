import { Router } from "express";
const router = new Router();
import UserController from "../controllers/UserController.js";

// User Routes
router.post("/add", UserController.create);
router.post("/login", UserController.check);

export default router;
