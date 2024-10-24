import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/validateToken", authController.verifyToken);

router.post(
  "/register",
  authController.verifyToken,
  authController.registerUser
);

export default router;
