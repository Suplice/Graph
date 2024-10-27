import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

router.post("", contactController.receiveMessage);

router.post;

export default router;
