import { https } from "firebase-functions/v2";
import express from "express";
import cors from "cors";
import * as admin from "firebase-admin";
import authRoutes from "./routes/authRoutes";

admin.initializeApp();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

exports.api = https.onRequest(app);
