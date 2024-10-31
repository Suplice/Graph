import { Request, Response, NextFunction } from "express";
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

const verifyToken =
  (continuePipeline: Boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
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

      if (continuePipeline) {
        return next();
      }

      return res.status(200).json({ message: "Token is valid", token: token });
    } catch (error) {
      console.error("Error verifying token:", error);
      return res
        .status(403)
        .json({ message: "Unauthorized: Invalid token", token: token });
    }
  };

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await admin.firestore().collection("users").doc(id).get();

    if (!user.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.data());
  } catch (error) {
    console.error("Error fetching user data:", error);
    const typedError = error as any;
    return res
      .status(500)
      .json({ message: typedError.message, code: typedError.code });
  }
};

export default {
  registerUser,
  verifyToken,
  getUser,
};
