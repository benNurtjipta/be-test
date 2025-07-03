import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectCompanyRoute } from "../middleware/protectCompanyRoute.js";
import { registerValidationRules, validate } from "../middleware/validation.js";
import { createAnzeigen } from "../controllers/createAnzeige.js";
import { verifyLogin } from "../controllers/auth.js";
import { deleteAdById } from "../controllers/deleteAd.js";

const companyRouter = express.Router();

companyRouter.post(
  "/create",
  registerValidationRules(),
  validate,
  createUserCompany
);

companyRouter
  .get("/ad", protectCompanyRoute, (req, res) => {})
  .post("/ad/create", protectCompanyRoute, createAnzeigen)
  .patch("/ad/update", protectCompanyRoute, (req, res) => {})
  .delete("/ad/:id/delete", protectCompanyRoute, deleteAdById)
  .post("/auth/login", verifyLogin);

export default companyRouter;
