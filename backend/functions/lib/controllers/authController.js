"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
require("firebase/auth");
const registerUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    try {
        const userRef = firebase_admin_1.default.firestore().collection("users").doc(res.locals.uid);
        await userRef.set({
            firstName,
            lastName,
            email,
            createdAt: new Date().toISOString(),
        });
        return res.status(201).json({
            message: "User created successfully",
            uid: res.locals.uid,
            email: email,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        const typedError = error;
        return res
            .status(500)
            .json({ message: typedError.message, code: typedError.code }); // Send detailed error message
    }
};
const verifyToken = (continuePipeline) => async (req, res, next) => {
    var _a;
    // Get the token from the Authorization header
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        // Verify the token using Firebase Admin SDK
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(token);
        res.locals.uid = decodedToken.uid;
        if (continuePipeline) {
            return next();
        }
        return res.status(200).json({ message: "Token is valid", token: token });
    }
    catch (error) {
        console.error("Error verifying token:", error);
        return res
            .status(403)
            .json({ message: "Unauthorized: Invalid token", token: token });
    }
};
exports.default = {
    registerUser,
    verifyToken,
};
//# sourceMappingURL=authController.js.map