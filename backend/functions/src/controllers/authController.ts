import { Request, Response } from "express";
import { User } from "../interfaces/User";
import admin from "firebase-admin";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password }: User = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword,
      displayName: `${firstName} ${lastName}`,
    });

    const userRef = admin.firestore().collection("users").doc(userRecord.uid);
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
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const baseLoginUser = async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const user = userRecord.toJSON();
    const userRef = admin.firestore().collection("users").doc(user.uid);
    const userDoc = await userRef.get();
    const userDocData = userDoc.data();

    if (!userDocData) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "User logged in successfully",
      uid: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  registerUser,
};
