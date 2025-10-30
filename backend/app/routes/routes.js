import { Router } from "express";
const router = new Router();
import UserController from "../controllers/UserController.js";

// User Routes
router.get("/see", UserController.seeOne);
router.post("/add", UserController.create);
router.post("/login", UserController.check);
router.get("/show/:id", UserController.show);
router.put("/update/:id", UserController.update);
router.delete("/delete/:id", UserController.destroy);

export default router;
