import AnzeigenModel from "../models/AnzeigenModel.js";
import { date } from "../libs/date.js";

export const patchAnzeigen = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text, position, location, salary, fulltime, techstack } =
      req.body;

    const companyId = req.company._id;
    const existingAd = await AnzeigenModel.findOne({
      _id: id,
    });

    existingAd.title = title ? title : existingAd.title;
    existingAd.description.text = text ? text : existingAd.description.text;
    existingAd.description.position = position
      ? position
      : existingAd.description.position;
    existingAd.description.location = location
      ? location
      : existingAd.description.location;
    existingAd.description.salary = salary
      ? salary
      : existingAd.description.salary;
    existingAd.description.fulltime = fulltime
      ? fulltime
      : existingAd.description.fulltime;
    existingAd.description.techstack = techstack
      ? techstack
      : existingAd.description.techstack;
    existingAd.updatedAt = date();

    const updatedAd = await existingAd.save();

    return res.status(200).json({
      message: "Ad updated successfully",
      anzeigen: updatedAd,
    });
  } catch (error) {
    next(error);
  }
};
