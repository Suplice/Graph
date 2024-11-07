import express from "express";
import dataController from "../controllers/dataController";
import authController from "../controllers/authController";

const router = express.Router();

router.get(
  "/statistics",
  authController.verifyToken(true),
  dataController.getStatistics
);

router.put(
  "/statistics",
  authController.verifyToken(true),
  dataController.updateStatistics
);

export default router;
