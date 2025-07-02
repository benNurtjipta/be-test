import { date } from "../libs/date.js";
import AnzeigenModel from "../models/AnzeigenModel.js";

export const createAnzeigen = async (req, res, next) => {
  try {
    const {
      title,
      text,
      position,
      location,
      salary,
      fulltime,
      techstack,
      createdFrom,
    } = req.body;

    if (!title || !text || !position || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const createdAt = date();

    const newAnzeige = new AnzeigenModel({
      title,
      description: {
        text,
        position,
        location,
        salary,
        fulltime,
        techstack: Array.isArray(techstack) ? techstack : [],
      },
      createdFrom,
      createdAt,
    });

    const savedDoc = await newAnzeige.save();

    return res.status(201).json({
      message: "Job posting created successfully",
      anzeigen: savedDoc,
    });
  } catch (error) {
    next(error);
  }
};
