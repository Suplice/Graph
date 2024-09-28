import express from "express";
import authController from "../controllers/authController";
import { validateRegistration } from "../middlewares/authValidators/baseRegisterValidator";
import { validateLogin } from "../middlewares/authValidators/baseLoginValidator";

const router = express.Router();

router.post("/register", validateRegistration, authController.registerUser);
router.post("/login", validateLogin);

export default router;
