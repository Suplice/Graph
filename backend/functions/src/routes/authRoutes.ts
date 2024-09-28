import express from "express";
import authController from "../controllers/authController";
import { validateRegistration } from "../middlewares/authValidators/baseRegisterValidator";

const router = express.Router();

router.post("/register", validateRegistration, authController.registerUser);

export default router;
