import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.post("/validateToken", authController.verifyToken(false));

router.post(
  "/register",
  authController.verifyToken(true),
  authController.registerUser
);

router.post;

export default router;
