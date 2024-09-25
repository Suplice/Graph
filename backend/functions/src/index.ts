import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import * as admin from "firebase-admin";

admin.initializeApp();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

exports.api = functions.https.onRequest(app);
