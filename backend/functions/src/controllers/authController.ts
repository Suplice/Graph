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

export default {
  registerUser,
};
