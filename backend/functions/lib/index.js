"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
// Initialize the Firebase Admin SDK
admin.initializeApp();
// Create an Express application
const app = express();
// Middleware for handling CORS and JSON parsing
app.use(cors({ origin: true }));
app.use(express.json());
// Firestore Database reference
const db = admin.firestore();
// GET route to fetch items from Firestore
app.get("/items", async (req, res) => {
    try {
        const snapshot = await db.collection("TestItems").get();
        const items = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        res.status(200).json(items);
    }
    catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send("Internal Server Error");
    }
});
// POST route to add a new item to Firestore
app.post("/items", async (req, res) => {
    try {
        const newItem = req.body;
        const docRef = await db.collection("items").add(newItem);
        res.status(201).json(Object.assign({ id: docRef.id }, newItem));
    }
    catch (error) {
        console.error("Error adding item:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Export the API as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map