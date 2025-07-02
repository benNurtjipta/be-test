import express from "express";
import createUserCompany from "../controllers/createUserCompany.js";
import { protectCompanyRoute } from "../middleware/protectCompanyRoute.js";
import { registerValidationRules, validate } from "../middleware/validation.js";

const companyRouter = express.Router();

companyRouter.post(
  "/create",
  registerValidationRules(),
  validate,
  createUserCompany
);

companyRouter
  .get("/ad", protectCompanyRoute, (req, res) => {})
  .post("/ad/create", protectCompanyRoute, (req, res) => {})
  .patch("/ad/update", protectCompanyRoute, (req, res) => {})
  .delete("/ad/delete", protectCompanyRoute, (req, res) => {});

export default companyRouter;
