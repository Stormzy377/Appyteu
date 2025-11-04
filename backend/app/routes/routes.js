import { Router } from "express";
const router = new Router();
import UserController from "../controllers/UserController.js";
import RestaurantController from "../controllers/RestaurantController.js";

// User Routes
router.post("/login", UserController.check);
router.get("/seeuser", UserController.seeOne);
router.post("/adduser", UserController.create);
router.get("/showuser/:id", UserController.show);
router.put("/updateuser/:id", UserController.update);
router.delete("/deleteuser/:id", UserController.destroy);

// Restaurant Routes
router.get("/allrestaurants", RestaurantController.all);
router.post("/addrestaurant", RestaurantController.create);
router.get("/seerestaurant", RestaurantController.search);
router.put("/updaterestaurant/:id", RestaurantController.update);
router.get("/findOnerestaurant/:id", RestaurantController.findOne);
router.delete("/destroyrestaurant/:id", RestaurantController.destroy);

export default router;
