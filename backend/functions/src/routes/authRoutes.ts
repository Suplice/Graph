import express from "express";
import authController from "../controllers/authController";
import {
  handleValidationErrors,
  registerValidator,
} from "../middlewares/authValidators/registerValidator";

const router = express.Router();

router.post(
  "/register",
  registerValidator,
  handleValidationErrors,
  authController.registerUser
);

export default router;
