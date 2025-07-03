import Anzeigen from "../models/AnzeigenModel.js"


export const getAllAdsCompany = async (req, res, next) => {
    try {
        const companyId = req.company._id
        const ads = await Anzeigen.find({createdFrom: companyId})
        .select("-__v -updatedAt -createdFrom")
        .populate({
            path: "appliedFrom",
            select: "-hashedPassword -createdAt -appliedTo -_id -createdAt -role -__v"
        })
        .sort({ createdAt: -1})

        if (!ads || ads.length === 0) {
            const error = new Error("Keine Anzeigen gefunden");
            error.statusCode = 404
        }

        return res.status(200).json(ads)

    } catch (error) {
        return next(error)
    }
}