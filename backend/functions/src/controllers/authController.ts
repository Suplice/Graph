import { Request, Response } from "express";
import { User } from "../interfaces/User";
import admin from "firebase-admin";
import "firebase/auth";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email }: User = req.body;

  try {
    const userRef = admin.firestore().collection("users").doc(res.locals.uid);
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
  } catch (error) {
    console.error("Error creating user:", error);
    const typedError = error as any;
    return res
      .status(500)
      .json({ message: typedError.message, code: typedError.code }); // Send detailed error message
  }
};

const verifyToken = async (req: Request, res: Response) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split("Bearer ")[1];
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.locals.uid = decodedToken.uid;
    return res
      .status(200)
      .json({ message: "Token is valid", uid: decodedToken.uid });
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(403)
      .json({ message: "Unauthorized: Invalid token", token: token });
  }
};

export default {
  registerUser,
  verifyToken,
};
