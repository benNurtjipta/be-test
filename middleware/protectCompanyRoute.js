import jwt from "jsonwebtoken";
import Company from "../models/CompanyModel.js";

export const protectCompanyRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Nicht autorisiert, kein Token vorhanden!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "company") {
      return res
        .status(401)
        .json({ message: "Nicht autorisiert für diese Route!" });
    }

    req.company = await Company.findById(decoded.id).select(
      "-hashedPassword -createdAt -__v"
    );
    /* .populate({
                path: "adsCreated"
            }); */

    if (!req.company) {
      return res.status(401).json({ message: "Unternehmen nicht gefunden" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Nicht autorisiert, Token ungültig" });
  }
};
