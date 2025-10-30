import { Router } from "express";
const router = new Router();
import UserController from "../controllers/UserController.js";

// User Routes
router.post("/add", UserController.create);
router.post("/login", UserController.check);
router.get("/show/:id", UserController.show);
router.get("/see", UserController.seeOne);

export default router;
