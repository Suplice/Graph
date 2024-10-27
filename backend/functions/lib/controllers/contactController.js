"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
require("firebase/auth");
const receiveMessage = async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    const messageId = (0, uuid_1.v4)();
    try {
        const messageRef = firebase_admin_1.default.firestore().collection("messages").doc(messageId);
        await messageRef.set({
            firstName,
            lastName,
            email,
            phoneNumber,
            message,
            createdAt: new Date().toISOString(),
        });
        return res.status(201).json({
            message: "Message was successfully received",
            messageId: messageId,
        });
    }
    catch (error) {
        console.error("Error receiving message:", error);
        const typedError = error;
        return res
            .status(500)
            .json({ message: typedError.message, code: typedError.code });
    }
};
exports.default = { receiveMessage };
//# sourceMappingURL=contactController.js.map