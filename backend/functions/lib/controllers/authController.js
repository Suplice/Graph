"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const userRecord = await firebase_admin_1.default.auth().createUser({
            email,
            password: hashedPassword,
            displayName: `${firstName} ${lastName}`,
        });
        const userRef = firebase_admin_1.default.firestore().collection("users").doc(userRecord.uid);
        await userRef.set({
            firstName,
            lastName,
            email,
            createdAt: new Date().toISOString(),
        });
        return res.status(201).json({
            message: "User created successfully",
            uid: userRecord.uid,
            email: userRecord.email,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.default = {
    registerUser,
};
//# sourceMappingURL=authController.js.map