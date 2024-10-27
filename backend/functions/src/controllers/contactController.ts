import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Message } from "../interfaces/Message";
import admin from "firebase-admin";
import "firebase/auth";

const receiveMessage = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, message }: Message =
    req.body;

  const messageId = uuidv4();

  try {
    const messageRef = admin.firestore().collection("messages").doc(messageId);
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
  } catch (error) {
    console.error("Error receiving message:", error);
    const typedError = error as any;
    return res
      .status(500)
      .json({ message: typedError.message, code: typedError.code });
  }
};

export default { receiveMessage };
