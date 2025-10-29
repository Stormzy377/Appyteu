import { Router } from "express";
const router = new Router();
import UserController from "../controllers/UserController.js";

router.get("/", UserController.index);
router.post("/add", UserController.create);

export default router;
