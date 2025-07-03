import Anzeigen from "../models/AnzeigenModel.js";
import User from "../models/UserModel.js";

export const applyToAd = async (req, res, next) => {
  try {
    const adId = req.params.id;
    const userId = req.user._id || req.user.id;

    const ad = await Anzeigen.findById(adId);
    if (!ad) {
      return res.status(404).json({
        message: "Anzeige nicht gefunden",
      });
    }

    if (ad.appliedFrom && ad.appliedFrom.includes(userId)) {
      return res.status(400).json({
        message: "Sie haben sich bereits auf diese Anzeige beworben",
      });
    }

    const updatedAd = await Anzeigen.findByIdAndUpdate(
      adId,
      { $addToSet: { appliedFrom: userId } },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { appliedTo: adId } },
      { new: true }
    );

    return res.status(201).json({
      message: "Bewerbung erfolgreich eingereicht",
    });
  } catch (error) {
    return next(error);
  }
};
