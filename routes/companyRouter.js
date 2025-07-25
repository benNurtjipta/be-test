import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectCompanyRoute } from "../middleware/protectCompanyRoute.js";
import { registerValidationRules, validate } from "../middleware/validation.js";
import { createAnzeigen } from "../controllers/createAnzeige.js";
import { verifyLogin } from "../controllers/auth.js";
import { deleteAdById } from "../controllers/deleteAd.js";
import { patchAnzeigen } from "../controllers/patchAnzeige.js";
import { getAllAdsCompany } from "../controllers/getAllAdsCompany.js";

const companyRouter = express.Router();

companyRouter.post(
  "/create",
  registerValidationRules(),
  validate,
  createUserCompany
);

companyRouter
  .get("/ad", protectCompanyRoute, getAllAdsCompany)
  .post("/ad/create", protectCompanyRoute, createAnzeigen)
  .delete("/ad/:id/delete", protectCompanyRoute, deleteAdById)
  .patch("/ad/:id/update", protectCompanyRoute, patchAnzeigen)
  .post("/auth/login", verifyLogin);

export default companyRouter;
