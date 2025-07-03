import AnzeigenModel from "../models/AnzeigenModel.js";
import { date } from "../libs/date.js";

export const patchAnzeigen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text, position, location, salary, fulltime, techstack } =
      req.body;

    const companyId = req.company._id;
  } catch (error) {
    next(error);
  }
};
