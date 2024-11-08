import { Request, Response } from "express";
import admin from "firebase-admin";
import { statistics } from "../interfaces/statistics";

const getStatistics = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const statisticsRef = admin.firestore().collection("statistics").doc(id);

    const statistics = await statisticsRef.get();

    if (!statistics.exists) {
      return res.status(404).json({ message: "Statistics not found" });
    }

    return res.status(200).json(statistics.data());
  } catch (error) {
    console.error("Error fetching statistics data:", error);
    const typedError = error as any;
    return res
      .status(500)
      .json({ message: typedError.message, code: typedError.code });
  }
};

const updateStatistics = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { createdGraphs, plottedFunctions, uploadedDataSets }: statistics =
    req.body;

  try {
    const statisticsRef = admin.firestore().collection("statistics").doc(id);

    await statisticsRef.update({
      createdGraphs,
      plottedFunctions,
      uploadedDataSets,
    });

    return res.status(200).json({ message: "Statistics updated successfully" });
  } catch (error) {
    console.error("Error updating statistics data:", error);
    const typedError = error as any;
    return res
      .status(500)
      .json({ message: typedError.message, code: typedError.code });
  }
};

const createStatistics = async (req: Request, res: Response) => {
  const id = res.locals.uid;

  try {
    const statisticsRef = admin.firestore().collection("statistics").doc(id);

    await statisticsRef.set({
      createdGraphs: 0,
      plottedFunctions: 0,
      uploadedDataSets: 0,
    });

    return res.status(201).json({ message: "Registered user successfully" });
  } catch (error) {
    console.error("Error creating statistics data:", error);
    const typedError = error as any;
    return res
      .status(500)
      .json({ message: typedError.message, code: typedError.code });
  }
};

export default { updateStatistics, getStatistics, createStatistics };
