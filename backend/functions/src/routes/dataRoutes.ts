import express from "express";
import dataController from "../controllers/dataController";
import authController from "../controllers/authController";

const router = express.Router();

router.get(
  "/getStatistics/:id",
  authController.verifyToken(true),
  dataController.getStatistics
);

router.put(
  "/setStatistics/:id",
  authController.verifyToken(true),
  dataController.updateStatistics
);

export default router;
