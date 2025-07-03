import Anzeigen from "../models/AnzeigenModel.js"


export const deleteAdById = async (req, res, next) => {
    try {
        const adId = req.params.id
        const ad = await Anzeigen.findById(adId)

        if(!ad) {
            const error = new Error("Anzeige nicht gefunden");
            error.statusCode = 404
        }

        await Anzeigen.findByIdAndDelete(adId)
        return res.status(200).json({message: "Anzeige gelöscht"})

    } catch(error) {
        return next(error);
    }
}