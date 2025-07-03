import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"

export const protectUserRoute = async (req, res, next) => {
    try {

        console.log("Test")
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({message: "Nicht autorisiert, kein Token vorhanden!"})
        };

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.role !== "applicant") {
            return res.status(401).json({message: "Nicht autorisiert für diese Route!"})
        };

        req.user = await User.findById(decoded.id)
            .select("-hashedPassword -createdAt -__v")
            /* .populate({
                path: "appliedTo"
            }); */

        if (!req.user) {
            return res.status(401).json({message: "Benutzer nicht gefunden"})
        };

        next()

    } catch (error) {
        return res.status(401).json({ message: "Nicht autorisiert, Token ungültig" })
    }
}