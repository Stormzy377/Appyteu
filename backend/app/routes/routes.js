import { Router } from "express";
const router = new Router();
import UserController from "../controllers/UserController.js";
import RestaurantController from "../controllers/RestaurantController.js";

// User Routes
router.get("/seeuser", UserController.seeOne);
router.post("/adduser", UserController.create);
router.post("/login", UserController.check);
router.get("/showuser/:id", UserController.show);
router.put("/updateuser/:id", UserController.update);
router.delete("/deleteuser/:id", UserController.destroy);

// Restaurant Routes

router.get("/allrestaurant", RestaurantController.all);
router.post("/addrestaurant", RestaurantController.create);
router.put("/updaterestaurant", RestaurantController.update);
router.get("/findOnerestaurant", RestaurantController.findOne);
router.delete("/destroyrestaurant", RestaurantController.destroy);

export default router;
