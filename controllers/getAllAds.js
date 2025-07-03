import Anzeigen from "../models/AnzeigenModel.js";

export const getAllAds = async (req, res, next) => {
  try {
    let query = {};

    if (req.query.filter) {
      const filters = req.query.filter;
      query = { "description.techstack.name": { $in: filters } };
    }

    const ads = await Anzeigen.find(query)
      .select("-appliedFrom -__v")
      .populate({
        path: "createdFrom",
        select: "-hashedPassword -email -createdAt -role -adsCreated -__v",
      })
      .sort({ createdAt: -1 });

    if (!ads || ads.length === 0) {
      const error = new Error("Keine Anzeigen gefunden");
      error.statusCode = 404;
    }

    return res.status(200).json(ads);
  } catch (error) {
    return next(error);
  }
};
