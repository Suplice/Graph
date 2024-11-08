import express from "express";
import authController from "../controllers/authController";
import dataController from "../controllers/dataController";

const router = express.Router();

router.post("/validateToken", authController.verifyToken(false));

router.post(
  "/register",
  authController.verifyToken(true),
  authController.registerUser,
  dataController.createStatistics
);

router.get(
  "/user/:id",
  authController.verifyToken(true),
  authController.getUser
);

router.post;

export default router;
